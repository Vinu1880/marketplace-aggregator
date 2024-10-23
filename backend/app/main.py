from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, platforms, products
from app.core.config import settings

app = FastAPI(title="Marketplace Aggregator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(platforms.router, prefix="/api/platforms", tags=["platforms"])
app.include_router(products.router, prefix="/api/products", tags=["products"])