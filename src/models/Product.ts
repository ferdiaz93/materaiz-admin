export interface Product {
  id: number;
  name: string;
  description: string;
  original_price: number;
  discount_price?: number | null;
  image: string;
  category_id: number;
}
