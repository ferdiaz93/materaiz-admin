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
import { TemplatePasswordField } from 'src/components/form/TemplatePasswordField';

export type CreateUserFormType = {
  email: string;
  password: string;
  password_confirmation: string;
};

const CreateUserSchema: Yup.ObjectSchema<CreateUserFormType> = Yup.object().shape({
  email: Yup.string().required('Email es requerido').email(),
  password: Yup.string()
    .min(4, 'Contraseña debe tener al menos 4 caracteres')
    .required('Contraseña es requerida'),
  password_confirmation: Yup.string()
    .required('Es necesario confirmar la Contraseña')
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
});

const defaultValues = {
  email: '1',
  password: '',
  password_confirmation: '',
};

type Props = {
  onSubmit: (value: CreateUserFormType) => Promise<any>;
};

export default function AdminUserCreateForm({ onSubmit }: Props) {
  const hf = useForm<CreateUserFormType>({
    resolver: yupResolver(CreateUserSchema),
    defaultValues,
    mode: 'onBlur',
  });

  return (
    <TemplateForm hf={hf} onSubmit={onSubmit}>
      <Controller
        name="email"
        control={hf.control}
        render={(field) => <TemplateTextField {...field} label="Email" placeholder="Carlos" />}
      />
      <Controller
        name="password"
        control={hf.control}
        render={(field) => <TemplatePasswordField {...field} label="Contraseña" />}
      />
      <Controller
        name="password_confirmation"
        control={hf.control}
        render={(field) => <TemplatePasswordField {...field} label="Confirmación de Contraseña" />}
      />

      <TemplateFormActions>
        <TemplateFormSubmitButton>Crear</TemplateFormSubmitButton>
      </TemplateFormActions>
    </TemplateForm>
  );
}
