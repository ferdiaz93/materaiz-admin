export type OrderItem = {
  id: number;
  product_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
};

export type Order = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  total_amount: number;
  created_at: string;
  address?: string;
  is_home_delivery: boolean;
  is_shipped: boolean;
  shipping_cost?: number;
  items: OrderItem[];
};
