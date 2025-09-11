import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import {
  TemplateForm,
  TemplateFormActions,
  TemplateFormSubmitButton,
  TemplateTextField,
} from 'src/components/form';

export type EditCategoryFormType = {
  name: string;
};

type Props = {
  values?: EditCategoryFormType;
  onSubmit: (value: EditCategoryFormType) => Promise<any>;
  isLoading?: boolean;
};

const EditCategorySchema: Yup.ObjectSchema<EditCategoryFormType> = Yup.object().shape({
  name: Yup.string().required('Nombre es requerido'),
});

const defaultValues: EditCategoryFormType = {
  name: '',
};

export default function CategoriesEditForm({ values, onSubmit, isLoading }: Props) {
  const hf = useForm<EditCategoryFormType>({
    resolver: yupResolver(EditCategorySchema),
    defaultValues,
    values,
    mode: 'onChange',
  });

  return (
    <TemplateForm hf={hf} onSubmit={onSubmit}>
      <Controller name="name" render={(field) => <TemplateTextField {...field} label="Name" />} />

      <TemplateFormActions>
        <TemplateFormSubmitButton>Guardar</TemplateFormSubmitButton>
      </TemplateFormActions>
    </TemplateForm>
  );
}
