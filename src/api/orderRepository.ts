import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from 'src/utils/httpClient';
import { useSuspenseQuery } from 'src/utils/useSupenseQuery';

// Interfaces
export interface CheckoutPayload {
  customer: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  total_amount: number;
  items: {
    product_id: number;
    product_name: string;
    quantity: number;
    unit_price: number;
    subtotal: number;
  }[];
}

export interface CheckoutResponse {
  success: boolean;
  orderId: number;
  message?: string;
}

export interface Order {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  total_amount: number;
  created_at: string;
  items: {
    product_name: string;
    quantity: number;
    unit_price: number;
    subtotal: number;
  }[];
}

export class OrderRepository {
  keys = {
    all: () => ['orders'],
    one: (id: number) => ['orders', id],
  };

  // CLIENTE
  create = (payload: CheckoutPayload) => httpClient.post<CheckoutResponse>('app/orders', payload);

  // BACKOFFICE
  getAll = async () => {
    const { data } = await httpClient.get<Order[]>('admin/orders');
    return data;
  };

  find = async (id: number) => {
    const { data } = await httpClient.get<Order>(`admin/orders/${id}`);
    return data;
  };

  remove = async (id: number) => httpClient.delete(`admin/orders/${id}`);
}

const repo = new OrderRepository();

// --- HOOKS CLIENTE ---
export const useCreateOrderMutation = () =>
  useMutation({
    mutationFn: repo.create,
  });

// --- HOOKS BACKOFFICE ---
export const useAllOrdersQuery = () =>
  useSuspenseQuery({ queryKey: repo.keys.all(), queryFn: repo.getAll });

export const useOrderQuery = (id: number) =>
  useSuspenseQuery({ queryKey: repo.keys.one(id), queryFn: () => repo.find(id) });

export const useDeleteOrderMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.remove,
    onSuccess: () => {
      qc.invalidateQueries(repo.keys.all());
    },
  });
};
