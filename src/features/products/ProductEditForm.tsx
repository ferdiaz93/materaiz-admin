import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import {
  TemplateForm,
  TemplateFormActions,
  TemplateFormSubmitButton,
  TemplateTextField,
} from 'src/components/form';

export type EditProductFormType = {
  name: string;
  price: number;
};

type Props = {
  values: EditProductFormType;
  onSubmit: (value: EditProductFormType) => Promise<any>;
};

const EditProductSchema: Yup.ObjectSchema<EditProductFormType> = Yup.object().shape({
  name: Yup.string().required('El nombre es requerido'),
  price: Yup.number().required('El precio es requerido').min(0, 'Debe ser mayor o igual a 0'),
});

const defaultValues: EditProductFormType = {
  name: '',
  price: 0,
};

export default function ProductEditForm({ values, onSubmit }: Props) {
  const hf = useForm<EditProductFormType>({
    resolver: yupResolver(EditProductSchema),
    defaultValues,
    values,
    mode: 'onBlur',
  });

  return (
    <TemplateForm hf={hf} onSubmit={onSubmit}>
      <Controller name="name" render={(field) => <TemplateTextField {...field} label="Nombre" />} />
      <Controller
        name="price"
        render={(field) => <TemplateTextField {...field} label="Precio" type="number" />}
      />
      <TemplateFormActions>
        <TemplateFormSubmitButton>Guardar</TemplateFormSubmitButton>
      </TemplateFormActions>
    </TemplateForm>
  );
}
