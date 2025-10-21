import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import {
  TemplateTextField,
  TemplateForm,
  TemplateFormActions,
  TemplateFormSubmitButton,
  TemplateNumberField,
} from 'src/components/form';

export type CreateProductFormType = {
  name: string;
  description: string;
  price: number;
  image: string;
};

const CreateProductSchema: Yup.ObjectSchema<CreateProductFormType> = Yup.object().shape({
  name: Yup.string().required('El nombre es requerido'),
  description: Yup.string().required('La descripción es requerida'),
  price: Yup.number()
    .typeError('El precio debe ser un número')
    .positive('El precio debe ser mayor a 0')
    .required('El precio es requerido'),
  image: Yup.string().required('La imagen es requerida'),
});

const defaultValues: CreateProductFormType = {
  name: '',
  description: '',
  price: 0,
  image: '',
};

type Props = {
  onSubmit: (value: CreateProductFormType) => Promise<any>;
};

export default function ProductCreateForm({ onSubmit }: Props) {
  const hf = useForm<CreateProductFormType>({
    resolver: yupResolver(CreateProductSchema),
    defaultValues,
    mode: 'onBlur',
  });

  return (
    <TemplateForm hf={hf} onSubmit={onSubmit}>
      <Controller
        name="name"
        control={hf.control}
        render={(field) => <TemplateTextField {...field} label="Nombre" />}
      />

      <Controller
        name="description"
        control={hf.control}
        render={(field) => <TemplateTextField {...field} label="Descripción" />}
      />

      <Controller
        name="price"
        control={hf.control}
        render={({ field, fieldState, formState }) => (
          <TemplateNumberField<CreateProductFormType>
            {...{ field, fieldState, formState }}
            label="Precio"
          />
        )}
      />

      <Controller
        name="image"
        control={hf.control}
        render={(field) => <TemplateTextField {...field} label="Imagen (URL)" />}
      />

      <TemplateFormActions>
        <TemplateFormSubmitButton>Crear</TemplateFormSubmitButton>
      </TemplateFormActions>
    </TemplateForm>
  );
}
