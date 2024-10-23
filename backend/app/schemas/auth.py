from pydantic import BaseModel
from typing import Optional, Dict

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    email: Optional[str] = None

class UserCreate(BaseModel):
    email: str
    password: str

class User(BaseModel):
    id: int
    email: str
    platform_tokens: Dict[str, dict]

    class Config:
        from_attributes = True