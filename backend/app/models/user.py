from sqlalchemy import Column, Integer, String, JSON
from app.db.base_class import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    platform_tokens = Column(JSON, default=dict)  # Stocke les tokens OAuth