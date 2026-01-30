import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import {
  TemplateForm,
  TemplateFormActions,
  TemplateFormSubmitButton,
  TemplateNumberField,
  TemplateTextField,
  TemplateSelectField,
  TemplateCheckboxField,
  TemplateRichTextField,
} from 'src/components/form';
import { Product } from 'src/models/Product';
import { Picker } from 'emoji-mart';
import { useState } from 'react';
import 'emoji-mart/css/emoji-mart.css';
import 'react-quill/dist/quill.snow.css';

export type EditProductFormType = Omit<Product, 'id'> & {
  image: string;
};

type Props = {
  values: any;
  categories: { id: number; name: string }[];
  onSubmit: (value: EditProductFormType) => Promise<any>;
};

const EditProductSchema = Yup.object().shape({
  name: Yup.string().required('El nombre es requerido'),
  description: Yup.string().required('La descripción es requerida'),
  original_price: Yup.number()
    .required('El precio original es requerido')
    .min(0, 'Debe ser mayor o igual a 0')
    .typeError('Debe ser un número'),
  discount_price: Yup.number()
    .transform((value, originalValue) =>
      originalValue === '' || originalValue === null ? null : value
    )
    .nullable()
    .optional()
    .positive('Debe ser mayor a 0')
    .max(Yup.ref('original_price'), 'No puede ser mayor al precio original'),
  image: Yup.string().required('La imagen es requerida').url('Debe ser una URL válida'),
  category_id: Yup.number()
    .typeError('La categoría es requerida')
    .positive('Debe seleccionar una categoría')
    .required('La categoría es requerida')
    .moreThan(0, 'Debe seleccionar una categoría válida'),
  is_custom_design: Yup.boolean().required(),
});

const defaultValues = {
  name: '',
  description: '',
  original_price: 0,
  discount_price: null,
  image: '',
  category_id: 0,
  is_custom_design: false,
};

export default function ProductEditForm({ values, categories, onSubmit }: Props) {
  const normalizedValues = {
    ...values,
    image: values.image || '',
    original_price: Number(values.original_price) || 0,
    discount_price: values.discount_price ? Number(values.discount_price) : null,
    category_id: values.category_id || 0,
    is_custom_design: Boolean(values.is_custom_design),
  };

  const hf = useForm<EditProductFormType>({
    resolver: yupResolver(EditProductSchema),
    defaultValues,
    values: normalizedValues,
    mode: 'onBlur',
  });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  return (
    <TemplateForm hf={hf} onSubmit={onSubmit}>
      <Controller name="name" render={(field) => <TemplateTextField {...field} label="Nombre" />} />

      <Controller
        name="description"
        control={hf.control}
        render={({ field, fieldState, formState }) => (
          <TemplateRichTextField
            label="Descripción"
            field={field}
            fieldState={fieldState}
            formState={formState}
          >
            <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              😀 Emoji
            </button>
            {showEmojiPicker && (
              <Picker
                onSelect={(emoji) => {
                  field.onChange(field.value + emoji.native);
                  setShowEmojiPicker(false);
                }}
              />
            )}
          </TemplateRichTextField>
        )}
      />

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
            value={field.value === null ? '' : field.value}
            onChange={(e) => {
              const { value } = e.target;
              if (value === '' || value === null) {
                field.onChange(null);
              } else {
                field.onChange(Number(value));
              }
            }}
          />
        )}
      />
      <Controller
        name="image"
        control={hf.control}
        render={({ field, fieldState, formState }) => (
          <TemplateTextField
            {...{ field, fieldState, formState }}
            label="Imagen (URL)"
            placeholder="https://ejemplo.com/imagen.jpg"
            required
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
            options={categories.map((c) => ({
              value: c.id,
              label: c.name,
            }))}
          />
        )}
      />
      <Controller
        name="is_custom_design"
        control={hf.control}
        render={({ field, fieldState, formState }) => (
          <TemplateCheckboxField<EditProductFormType>
            label="Diseño personalizado"
            field={field}
            fieldState={fieldState}
            formState={formState}
          />
        )}
      />

      <TemplateFormActions>
        <TemplateFormSubmitButton>Guardar</TemplateFormSubmitButton>
      </TemplateFormActions>
    </TemplateForm>
  );
}
