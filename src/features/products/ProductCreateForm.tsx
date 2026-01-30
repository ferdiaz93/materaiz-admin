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
  TemplateRichTextField,
  TemplateCheckboxField,
} from 'src/components/form';
import { useAllCategoriesQuery } from 'src/api/categoryRepository';
import { Picker } from 'emoji-mart';
import { useState } from 'react';
import 'emoji-mart/css/emoji-mart.css';
import 'react-quill/dist/quill.snow.css';

export type CreateProductFormType = {
  name: string;
  description: string;
  original_price: number;
  discount_price?: number | null;
  image: string;
  category_id: number;
  is_custom_design: boolean;
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
  is_custom_design: Yup.boolean()
    .required()
    .default(false),
});

const defaultValues: CreateProductFormType = {
  name: '',
  description: '',
  original_price: 0,
  discount_price: null,
  image: '',
  category_id: 0,
  is_custom_design: false,
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

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
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

      <Controller
        name="is_custom_design"
        control={hf.control}
        render={({ field, fieldState, formState }) => (
          <TemplateCheckboxField<CreateProductFormType>
            label="Diseño personalizado"
            field={field}
            fieldState={fieldState}
            formState={formState}
          />
        )}
      />
      
      <TemplateFormActions>
        <TemplateFormSubmitButton>Crear</TemplateFormSubmitButton>
      </TemplateFormActions>
    </TemplateForm>
  );
}
