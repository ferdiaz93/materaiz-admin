import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Product } from 'src/models/Product';
import { httpClient } from 'src/utils/httpClient';
import { useSuspenseQuery } from 'src/utils/useSupenseQuery';

interface ICreateProduct {
  name: string;
}

interface IEditProduct {
  id: number;
  name: string;
}

export const getProductMapper = (x: any): Product => x;

export class ProductRepository {
  keys = {
    all: () => ['products'],
    one: (id: number) => ['products', id],
  };

  getAll = async () => {
    const { data } = await httpClient.get<any[]>('admin/products');
    return data.map(getProductMapper);
  };

  find = async (id: number) => {
    const { data } = await httpClient.get(`admin/products/${id}`);
    return getProductMapper(data);
  };

  create = (product: ICreateProduct) => httpClient.post('admin/products', product);

  edit = async (product: IEditProduct) => httpClient.put(`admin/products/${product.id}`, product);

  remove = async (id: number) => httpClient.delete(`admin/products/${id}`);
}

const repo = new ProductRepository();

export const useAllProductsQuery = () =>
  useSuspenseQuery({ queryKey: repo.keys.all(), queryFn: repo.getAll });

export const useProductQuery = (id: number) =>
  useSuspenseQuery({ queryKey: repo.keys.one(id), queryFn: () => repo.find(id) });

export const useCreateProductMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.create,
    onSuccess: () => {
      qc.invalidateQueries(repo.keys.all());
    },
  });
};

export const useDeleteProductMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.remove,
    onSuccess: () => {
      qc.invalidateQueries(repo.keys.all());
    },
  });
};

export const useEditProductMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.edit,
    onSuccess: (_, vars) => {
      qc.invalidateQueries(repo.keys.one(vars.id));
    },
  });
};
