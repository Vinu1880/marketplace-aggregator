export interface AuthState {
  isAuthenticated: boolean;
  platforms: {
    facebook: boolean;
    anibis: boolean;
    tutti: boolean;
    ricardo: boolean;
  };
  user: User | null;
}

export interface User {
  id: string;
  email: string;
  name: string;
  connectedPlatforms: string[];
}

export interface OAuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  platform: string;
}