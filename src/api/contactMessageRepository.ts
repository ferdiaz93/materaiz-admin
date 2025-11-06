import { httpClient } from 'src/utils/httpClient';
import { useMutation } from '@tanstack/react-query';
import { useSuspenseQuery } from 'src/utils/useSupenseQuery';

export type ContactFormType = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

export type ContactMessage = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  message: string;
  created_at: string;
  updated_at: string;
};

export class ContactRepository {
  keys = {
    all: () => ['contact-messages'],
    create: () => ['contact-messages', 'create'],
    detail: (id: number) => ['contact-messages', id],
  };

  getAll = async () => {
    const { data } = await httpClient.get<{ data?: ContactMessage[] }>('admin/contact-messages');
    return data?.data ?? [];
  };
  find = async (id: number) => {
    const { data } = await httpClient.get<{ data: ContactMessage }>(`admin/contact-messages/${id}`);
    return data.data;
  };
  create = async (values: ContactFormType) => {
    const { data } = await httpClient.post('app/contact-messages', values);
    return data;
  };
}

const repo = new ContactRepository();

export const useAllContactMessagesQuery = () =>
  useSuspenseQuery({ queryKey: repo.keys.all(), queryFn: repo.getAll });

export const useContactMutation = () =>
  useMutation({
    mutationKey: repo.keys.create(),
    mutationFn: repo.create,
    onSuccess: () => ({
      message: 'Consulta enviada con éxito',
      variant: 'success' as const,
    }),
    onError: (error: any) => ({
      message: error.response?.data?.error || 'Error al enviar la consulta',
      variant: 'error' as const,
    }),
  });
export const useContactMessageQuery = (id: number) =>
  useSuspenseQuery({
    queryKey: repo.keys.detail(id),
    queryFn: () => repo.find(id),
  });
