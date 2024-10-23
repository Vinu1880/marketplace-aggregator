from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.session import get_db
from app.models.user import User
from app.schemas.product import Product, ProductList
from app.services.product_service import product_service
from app.core.security import get_current_user

router = APIRouter()

@router.get("", response_model=ProductList)
async def get_products(
    platform: Optional[str] = None,
    search: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    sort_by: Optional[str] = "created_at",
    sort_order: Optional[str] = "desc",
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Récupère les produits de toutes les plateformes connectées avec filtres"""
    products = await product_service.get_products(
        user=current_user,
        platform=platform,
        search=search,
        min_price=min_price,
        max_price=max_price,
        sort_by=sort_by,
        sort_order=sort_order,
        page=page,
        limit=limit,
        db=db
    )
    return products

@router.get("/sync", status_code=202)
async def sync_products(
    platform: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Synchronise les produits depuis les plateformes connectées"""
    await product_service.sync_products(user=current_user, platform=platform, db=db)
    return {"message": "Synchronisation des produits lancée"}