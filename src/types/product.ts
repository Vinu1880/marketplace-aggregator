export interface Product {
  id: number;
  platform_id: string;
  platform: string;
  title: string;
  description?: string;
  price: number;
  currency: string;
  location?: string;
  images: string[];
  url: string;
  created_at: string;
  updated_at: string;
}

export interface ProductFilters {
  platform?: string;
  search?: string;
  min_price?: number;
  max_price?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface ProductList {
  items: Product[];
  total: number;
}