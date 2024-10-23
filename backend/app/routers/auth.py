from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.core.security import create_access_token, verify_password
from app.db.session import get_db
from app.models.user import User
from app.schemas.auth import Token, UserCreate
from app.services import platform_service

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/register", response_model=Token)
async def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = User(
        email=user.email,
        hashed_password=get_password_hash(user.password),
        platform_tokens={}
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/{platform}/url")
async def get_auth_url(platform: str):
    return {"url": platform_service.get_auth_url(platform)}

@router.post("/{platform}/connect")
async def connect_platform(
    platform: str,
    code: str,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    tokens = await platform_service.exchange_code(platform, code)
    user.platform_tokens[platform] = tokens
    db.commit()
    return {"status": "success"}