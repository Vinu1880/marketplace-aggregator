from typing import Dict, List, Optional
import httpx
from sqlalchemy.orm import Session
from app.models.user import User
from app.models.product import Product
from app.schemas.product import ProductList
from app.core.config import settings

class ProductService:
    async def get_products(
        self,
        user: User,
        platform: Optional[str] = None,
        search: Optional[str] = None,
        min_price: Optional[float] = None,
        max_price: Optional[float] = None,
        sort_by: str = "created_at",
        sort_order: str = "desc",
        page: int = 1,
        limit: int = 20,
        db: Session = None
    ) -> ProductList:
        """Récupère les produits avec filtres et pagination"""
        query = db.query(Product).filter(Product.user_id == user.id)

        if platform:
            query = query.filter(Product.platform == platform)
        if search:
            query = query.filter(Product.title.ilike(f"%{search}%"))
        if min_price is not None:
            query = query.filter(Product.price >= min_price)
        if max_price is not None:
            query = query.filter(Product.price <= max_price)

        # Tri
        order_col = getattr(Product, sort_by)
        if sort_order == "desc":
            order_col = order_col.desc()
        query = query.order_by(order_col)

        # Pagination
        total = query.count()
        products = query.offset((page - 1) * limit).limit(limit).all()

        return ProductList(items=products, total=total)

    async def sync_products(
        self,
        user: User,
        platform: Optional[str] = None,
        db: Session = None
    ) -> None:
        """Synchronise les produits depuis les plateformes"""
        platforms_to_sync = [platform] if platform else user.platform_tokens.keys()

        for platform_name in platforms_to_sync:
            if platform_name not in user.platform_tokens:
                continue

            products = await self._fetch_platform_products(
                platform=platform_name,
                token=user.platform_tokens[platform_name]["access_token"]
            )

            for product_data in products:
                existing_product = db.query(Product).filter(
                    Product.platform_id == product_data["platform_id"],
                    Product.platform == platform_name
                ).first()

                if existing_product:
                    # Mise à jour du produit existant
                    for key, value in product_data.items():
                        setattr(existing_product, key, value)
                else:
                    # Création d'un nouveau produit
                    new_product = Product(**product_data, user_id=user.id)
                    db.add(new_product)

            db.commit()

    async def _fetch_platform_products(self, platform: str, token: str) -> List[Dict]:
        """Récupère les produits depuis une plateforme spécifique"""
        platform_apis = {
            "facebook": {
                "url": "https://graph.facebook.com/v12.0/me/marketplace_listings",
                "headers": {"Authorization": f"Bearer {token}"}
            },
            "anibis": {
                "url": "https://api.anibis.ch/v4/listings",
                "headers": {"Authorization": f"Bearer {token}"}
            },
            # Configurations pour autres plateformes
        }

        api_config = platform_apis.get(platform)
        if not api_config:
            raise ValueError(f"Platform {platform} not supported")

        async with httpx.AsyncClient() as client:
            response = await client.get(
                api_config["url"],
                headers=api_config["headers"]
            )
            data = response.json()
            
            # Normalisation des données selon la plateforme
            return self._normalize_products(platform, data)

    def _normalize_products(self, platform: str, data: Dict) -> List[Dict]:
        """Normalise les données des produits selon la plateforme"""
        if platform == "facebook":
            return [{
                "platform_id": item["id"],
                "platform": "facebook",
                "title": item["title"],
                "description": item.get("description"),
                "price": float(item["price"]),
                "currency": item.get("currency", "CHF"),
                "location": item.get("location", {}).get("name"),
                "images": [img["source"] for img in item.get("photos", [])],
                "url": f"https://www.facebook.com/marketplace/item/{item['id']}"
            } for item in data.get("data", [])]
        
        elif platform == "anibis":
            return [{
                "platform_id": item["id"],
                "platform": "anibis",
                "title": item["title"],
                "description": item.get("description"),
                "price": float(item["price"]),
                "currency": item.get("currency", "CHF"),
                "location": item.get("location"),
                "images": item.get("images", []),
                "url": item["url"]
            } for item in data.get("items", [])]

        return []

product_service = ProductService()