from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.db.base_class import Base
from datetime import datetime

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    platform_id = Column(String, index=True)  # ID du produit sur la plateforme d'origine
    platform = Column(String, index=True)  # facebook, anibis, etc.
    title = Column(String)
    description = Column(String)
    price = Column(Float)
    currency = Column(String, default="CHF")
    location = Column(String)
    images = Column(JSON)  # Liste d'URLs d'images
    url = Column(String)  # URL originale du produit
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    user = relationship("User", back_populates="products")