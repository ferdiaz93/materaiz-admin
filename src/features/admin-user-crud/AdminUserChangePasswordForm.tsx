import * as Yup from 'yup';

// form
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
// @mui

import { TemplateForm } from 'src/components/form/TemplateForm';
import {
  TemplateFormActions,
  TemplateFormSubmitButton,
} from 'src/components/form/TemplateFormActions';
import { TemplatePasswordField } from 'src/components/form/TemplatePasswordField';

export interface ChangePasswordFormType {
  password: string;
  password_confirmation: string;
}

const EditUserSchema: Yup.ObjectSchema<ChangePasswordFormType> = Yup.object().shape({
  password: Yup.string()
    .min(4, 'Contraseña debe tener al menos 4 caracteres')
    .required('Contraseña es requerida'),
  password_confirmation: Yup.string()
    .required('Es necesario confirmar la Contraseña')
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
});

const defaultValues = { password: '', password_confirmation: '' };

type Props = {
  onSubmit: (value: ChangePasswordFormType) => Promise<any>;
};

export default function AdminUserChangePasswordForm({ onSubmit }: Props) {
  const hf = useForm<ChangePasswordFormType>({
    resolver: yupResolver(EditUserSchema),
    defaultValues,
    mode: 'onBlur',
  });

  return (
    <TemplateForm hf={hf} onSubmit={onSubmit}>
      <Controller
        name="password"
        control={hf.control}
        render={(field) => <TemplatePasswordField {...field} label="Contraseña" />}
      />
      <Controller
        name="password_confirmation"
        control={hf.control}
        render={(field) => <TemplatePasswordField {...field} label="Confirmar Contraseña" />}
      />

      <TemplateFormActions>
        <TemplateFormSubmitButton>Guardar</TemplateFormSubmitButton>
      </TemplateFormActions>
    </TemplateForm>
  );
}
