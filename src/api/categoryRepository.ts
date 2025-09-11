import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Category } from 'src/models/Category';
import { httpClient } from 'src/utils/httpClient';
import { useSuspenseQuery } from 'src/utils/useSupenseQuery';

interface ICreateCategory {
  name: string;
}

interface IEditCategory {
  name: string;
  id: number;
}

export const getCategoryMapper = (x: any): Category => x;

export const createCategoryMapper = (x: ICreateCategory) => x;

export class CategoryRepository {
  keys = {
    all: () => ['categories'],
    one: (id: number) => ['categories', id],
  };

  getAll = async () => {
    const { data } = await httpClient.get<any[]>('categories');
    return data.map(getCategoryMapper);
  };

  find = async (id: number) => {
    const { data } = await httpClient.get(`categories/${id}`);
    return getCategoryMapper(data);
  };

  create = (category: ICreateCategory) => httpClient.post('categories', category);

  edit = async (category: IEditCategory) => httpClient.put(`categories/${category.id}`, category);

  remove = async (id: number) => httpClient.delete(`categories/${id}`);
}

const repo = new CategoryRepository();

export const useAllCategoriesQuery = () =>
  useSuspenseQuery({ queryKey: repo.keys.all(), queryFn: repo.getAll });

export const useCategoryQuery = (id: number) =>
  useQuery({ queryKey: repo.keys.one(id), queryFn: () => repo.find(id) });

export const useCreateCategoryMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.create,
    onSuccess: () => {
      qc.invalidateQueries(repo.keys.all());
    },
  });
};

export const useDeleteCategoryMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.remove,
    onSuccess: () => {
      qc.invalidateQueries(repo.keys.all());
    },
  });
};

export const useEditCategoryMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.edit,
    onSuccess: (_, vars) => {
      qc.invalidateQueries(repo.keys.one(vars.id));
    },
  });
};
