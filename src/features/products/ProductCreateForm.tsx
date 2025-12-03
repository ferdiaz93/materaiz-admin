import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import {
  TemplateTextField,
  TemplateForm,
  TemplateFormActions,
  TemplateFormSubmitButton,
  TemplateNumberField,
  TemplateSelectField,
} from 'src/components/form';
import { useAllCategoriesQuery } from 'src/api/categoryRepository';

export type CreateProductFormType = {
  name: string;
  description: string;
  original_price: number;
  discount_price?: number | null;
  image: string;
  category_id: number;
};

const CreateProductSchema: Yup.ObjectSchema<CreateProductFormType> = Yup.object().shape({
  name: Yup.string().required('El nombre es requerido'),
  description: Yup.string().required('La descripción es requerida'),
  original_price: Yup.number()
    .typeError('El precio original debe ser un número')
    .positive('El precio original debe ser mayor a 0')
    .required('El precio original es requerido'),
  discount_price: Yup.number()
    .transform((value, originalValue) =>
      originalValue === '' || originalValue === null ? null : value
    )
    .nullable()
    .optional()
    .positive('Debe ser mayor a 0')
    .max(Yup.ref('original_price'), 'No puede ser mayor al precio original'),
  image: Yup.string().required('La imagen es requerida'),
  category_id: Yup.number()
    .typeError('La categoría es requerida')
    .positive('Debe seleccionar una categoría')
    .required('La categoría es requerida')
    .moreThan(0, 'Debe seleccionar una categoría válida'),
});

const defaultValues: CreateProductFormType = {
  name: '',
  description: '',
  original_price: 0,
  discount_price: null,
  image: '',
  category_id: 0,
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
  const { data: categories } = useAllCategoriesQuery();

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
        name="original_price"
        control={hf.control}
        render={({ field, fieldState, formState }) => (
          <TemplateNumberField<CreateProductFormType>
            {...{ field, fieldState, formState }}
            label="Precio original"
          />
        )}
      />

      <Controller
        name="discount_price"
        control={hf.control}
        render={({ field, fieldState, formState }) => (
          <TemplateNumberField<CreateProductFormType>
            {...{ field, fieldState, formState }}
            label="Precio con descuento"
          />
        )}
      />
      <Controller
        name="category_id"
        control={hf.control}
        render={({ field, fieldState, formState }) => (
          <TemplateSelectField
            {...{ field, fieldState, formState }}
            label="Categoría"
            placeholder="Seleccionar categoría"
            options={(categories ?? []).map((c) => ({
              value: c.id,
              label: c.name,
            }))}
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
