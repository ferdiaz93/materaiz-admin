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
import { TemplateNumberField } from 'src/components/form/TemplateNumberField';
import { TemplatePasswordField } from 'src/components/form/TemplatePasswordField';
import { TemplateTextField } from 'src/components/form/TemplateTextField';
import { TFunction, useTranslation } from 'react-i18next';
// routes

// ----------------------------------------------------------------------

export type UpdatePasswordFormValueType = {
  code: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const VerifyCodeSchema = (
  t: TFunction<'translation', undefined>
): Yup.ObjectSchema<UpdatePasswordFormValueType> =>
  Yup.object().shape({
    code: Yup.string().required().label(t('code')),
    email: Yup.string().email().required().label(t('email')),
    password: Yup.string().min(6).required().label(t('password')),
    confirmPassword: Yup.string()
      .required()
      .label(t('confirmPassword'))
      .oneOf([Yup.ref('password')], t('reset_password.password_not_match')),
  });

const defaultValues: UpdatePasswordFormValueType = {
  code: '',
  email: '',
  password: '',
  confirmPassword: '',
};

interface Props {
  onSubmit: (value: UpdatePasswordFormValueType) => Promise<any>;
}

export default function AuthNewPasswordForm({ onSubmit }: Props) {
  const { t } = useTranslation();
  const hf = useForm({
    mode: 'onBlur',
    resolver: yupResolver(VerifyCodeSchema(t)),
    defaultValues,
  });

  return (
    <TemplateForm hf={hf} onSubmit={onSubmit}>
      <Controller
        name="email"
        control={hf.control}
        render={(field) => <TemplateTextField {...field} label={t('email')} />}
      />

      <Controller
        name="code"
        control={hf.control}
        render={(field) => <TemplateNumberField {...field} label={t('code')} />}
      />

      <Controller
        name="password"
        control={hf.control}
        render={(field) => <TemplatePasswordField {...field} label={t('password')} />}
      />

      <Controller
        name="confirmPassword"
        control={hf.control}
        render={(field) => <TemplatePasswordField {...field} label={t('confirmPassword')} />}
      />

      <TemplateFormActions>
        <TemplateFormSubmitButton>{t('reset_password.update_password')}</TemplateFormSubmitButton>
      </TemplateFormActions>
    </TemplateForm>
  );
}
