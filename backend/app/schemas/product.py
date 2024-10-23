from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class ProductBase(BaseModel):
    platform_id: str
    platform: str
    title: str
    description: Optional[str] = None
    price: float
    currency: str = "CHF"
    location: Optional[str] = None
    images: List[str]
    url: str

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int
    created_at: datetime
    updated_at: datetime
    user_id: int

    class Config:
        from_attributes = True

class ProductList(BaseModel):
    items: List[Product]
    total: int