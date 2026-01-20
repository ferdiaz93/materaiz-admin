import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import {
  TemplateForm,
  TemplateFormActions,
  TemplateFormSubmitButton,
  TemplateTextField,
} from 'src/components/form';

export type EditAddonFormType = {
  name: string;
  price: number;
  description?: string;
};

type Props = {
  values?: EditAddonFormType;
  onSubmit: (values: EditAddonFormType) => Promise<any>;
  isLoading?: boolean;
};

const EditAddonSchema: Yup.ObjectSchema<EditAddonFormType> = Yup.object().shape({
  name: Yup.string().required('El nombre es requerido'),
  price: Yup.number()
    .required('El precio es requerido')
    .positive('El precio debe ser mayor a 0')
    .typeError('El precio debe ser un número válido'),
  description: Yup.string().optional(),
});

const defaultValues: EditAddonFormType = {
  name: '',
  price: 0,
  description: '',
};

export default function AddonsEditForm({ values, onSubmit, isLoading }: Props) {
  const hf = useForm<EditAddonFormType>({
    resolver: yupResolver(EditAddonSchema),
    defaultValues,
    values,
    mode: 'onChange',
  });

  return (
    <TemplateForm hf={hf} onSubmit={onSubmit}>
      <Controller name="name" render={(field) => <TemplateTextField {...field} label="Nombre" />} />

      <Controller
        name="price"
        render={(field) => (
          <TemplateTextField
            {...field}
            label="Precio"
            type="number"
            InputProps={{ inputProps: { min: 0, step: 0.01 } }}
          />
        )}
      />
      <TemplateFormActions>
        <TemplateFormSubmitButton loading={isLoading}>
          Guardar cambios
        </TemplateFormSubmitButton>
      </TemplateFormActions>
    </TemplateForm>
  );
}