from typing import Dict
import httpx
from app.core.config import settings

class PlatformService:
    async def get_auth_url(self, platform: str) -> str:
        platform_configs = {
            "facebook": {
                "url": "https://www.facebook.com/v12.0/dialog/oauth",
                "client_id": settings.FACEBOOK_CLIENT_ID,
                "redirect_uri": f"{settings.API_URL}/auth/facebook/callback",
                "scope": "marketplace_listings"
            },
            "anibis": {
                "url": "https://api.anibis.ch/oauth2/authorize",
                "client_id": settings.ANIBIS_CLIENT_ID,
                "redirect_uri": f"{settings.API_URL}/auth/anibis/callback",
                "scope": "read write"
            },
            # Configurations pour autres plateformes
        }
        
        config = platform_configs.get(platform)
        if not config:
            raise ValueError(f"Platform {platform} not supported")
            
        params = {
            "client_id": config["client_id"],
            "redirect_uri": config["redirect_uri"],
            "scope": config["scope"],
            "response_type": "code"
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.get(config["url"], params=params)
            return response.url

    async def exchange_code(self, platform: str, code: str) -> Dict:
        platform_configs = {
            "facebook": {
                "token_url": "https://graph.facebook.com/v12.0/oauth/access_token",
                "client_id": settings.FACEBOOK_CLIENT_ID,
                "client_secret": settings.FACEBOOK_CLIENT_SECRET
            },
            # Configurations pour autres plateformes
        }
        
        config = platform_configs.get(platform)
        if not config:
            raise ValueError(f"Platform {platform} not supported")
            
        data = {
            "client_id": config["client_id"],
            "client_secret": config["client_secret"],
            "code": code,
            "grant_type": "authorization_code"
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(config["token_url"], data=data)
            return response.json()

platform_service = PlatformService()