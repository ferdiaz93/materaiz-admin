import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from 'src/utils/httpClient';
import { useSuspenseQuery } from 'src/utils/useSupenseQuery';

export interface AddonDetail {
  key: string;
  name: string;
  price: number;
  description?: string | null;
}

export const addonDetailMapper = (key: string, value: { name: string; price: number; description?: string | null }): AddonDetail => ({
  key,
  name: value.name,
  price: Number(value.price),
  description: value.description || null,
});

export class AddonRepository {
  keys = {
    allDetails: () => ['addons', 'details'],
    one: (key: string) => ['addons', 'details', key],
  };

  getAllDetails = async () => {
    const { data } = await httpClient.get<{ success: boolean; data: Record<string, { name: string; price: number; description?: string | null }> }>(
      'app/addon-prices'
    );
  
    if (!data.success) throw new Error('Error al cargar configuración de extras');
  
    return Object.entries(data.data).map(([key, value]) => addonDetailMapper(key, value));
  };

  edit = async ({ key, data }: { key: string; data: any }) => httpClient.put(`admin/addon-settings/${key}`, data)
}

const repo = new AddonRepository();

export const useAddonDetailsQuery = () =>
  useSuspenseQuery({
    queryKey: repo.keys.allDetails(),
    queryFn: repo.getAllDetails,
  });

export const useEditAddonMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: repo.edit,
    onSuccess: (_, vars) => {
      qc.invalidateQueries(repo.keys.one(vars.key));
      qc.invalidateQueries(repo.keys.allDetails());
    },
  });
};