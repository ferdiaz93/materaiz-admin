import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import {
  TemplateForm,
  TemplateFormActions,
  TemplateFormSubmitButton,
  TemplateNumberField,
  TemplateTextField,
} from 'src/components/form';

export type EditProductFormType = {
  name: string;
  original_price: number;
  discount_price: number;
};

type Props = {
  values: EditProductFormType;
  onSubmit: (value: EditProductFormType) => Promise<any>;
};

const EditProductSchema: Yup.ObjectSchema<EditProductFormType> = Yup.object().shape({
  name: Yup.string().required('El nombre es requerido'),
  original_price: Yup.number()
    .required('El precio original es requerido')
    .min(0, 'Debe ser mayor o igual a 0')
    .typeError('Debe ser un número'),
  discount_price: Yup.number()
    .required('El precio con descuento es requerido')
    .min(0, 'Debe ser mayor o igual a 0')
    .max(Yup.ref('original_price'), 'No puede ser mayor al precio original')
    .typeError('Debe ser un número'),
});

const defaultValues: EditProductFormType = {
  name: '',
  original_price: 0,
  discount_price: 0,
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
        name="original_price"
        control={hf.control}
        render={({ field, fieldState, formState }) => (
          <TemplateNumberField<EditProductFormType>
            {...{ field, fieldState, formState }}
            label="Precio original"
          />
        )}
      />

      <Controller
        name="discount_price"
        control={hf.control}
        render={({ field, fieldState, formState }) => (
          <TemplateNumberField<EditProductFormType>
            {...{ field, fieldState, formState }}
            label="Precio con descuento"
          />
        )}
      />
      <TemplateFormActions>
        <TemplateFormSubmitButton>Guardar</TemplateFormSubmitButton>
      </TemplateFormActions>
    </TemplateForm>
  );
}
