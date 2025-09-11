import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
// @mui
import { TemplateTextField } from 'src/components/form';
import { TemplateForm } from 'src/components/form/TemplateForm';
import {
  TemplateFormActions,
  TemplateFormSubmitButton,
} from 'src/components/form/TemplateFormActions';

export type CreateCategoryFormType = {
  name: string;
};

const CreateCategorySchema: Yup.ObjectSchema<CreateCategoryFormType> = Yup.object().shape({
  name: Yup.string().required('El nombre de la categoría es requerido'),
});

const defaultValues = {
  name: '',
};

type Props = {
  onSubmit: (value: CreateCategoryFormType) => Promise<any>;
};

export default function CategoriesCreateForm({ onSubmit }: Props) {
  const hf = useForm<CreateCategoryFormType>({
    resolver: yupResolver(CreateCategorySchema),
    defaultValues,
    mode: 'onChange',
  });

  return (
    <TemplateForm hf={hf} onSubmit={onSubmit}>
      <Controller
        name="name"
        control={hf.control}
        render={(field) => <TemplateTextField {...field} label="Nombre" placeholder="Categoría" />}
      />
      <TemplateFormActions>
        <TemplateFormSubmitButton>Crear</TemplateFormSubmitButton>
      </TemplateFormActions>
    </TemplateForm>
  );
}
