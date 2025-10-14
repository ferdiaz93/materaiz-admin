import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import {
  TemplateForm,
  TemplateFormActions,
  TemplateFormSubmitButton,
  TemplateTextField,
} from 'src/components/form';

export type EditUserFormType = {
  email: string;
};

type Props = {
  values: EditUserFormType;
  onSubmit: (value: EditUserFormType) => Promise<any>;
};

const EditUserSchema: Yup.ObjectSchema<EditUserFormType> = Yup.object().shape({
  email: Yup.string().required('Email es requerido').email(),
  roles: Yup.array()
    .min(1, 'Debes elegir al menos un rol')
    .required('Debes elegir al menos un rol'),
});

const defaultValues: EditUserFormType = {
  email: '',
};

export default function AdminUserEditForm({ values, onSubmit }: Props) {
  const hf = useForm<EditUserFormType>({
    resolver: yupResolver(EditUserSchema),
    defaultValues,
    values,
    mode: 'onBlur',
  });

  return (
    <TemplateForm hf={hf} onSubmit={onSubmit}>
      <Controller name="email" render={(field) => <TemplateTextField {...field} label="Email" />} />
      <TemplateFormActions>
        <TemplateFormSubmitButton>Guardar</TemplateFormSubmitButton>
      </TemplateFormActions>
    </TemplateForm>
  );
}
