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
  items: OrderItem[];
};
