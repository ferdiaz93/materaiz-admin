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
import { TemplateTextField } from 'src/components/form/TemplateTextField';
import { TFunction, useTranslation } from 'react-i18next';
// routes

// ----------------------------------------------------------------------

export type ForgotPasswordFormType = {
  email: string;
};

const ForgotPasswordSchema = (
  t: TFunction<'translation', undefined>
): Yup.ObjectSchema<ForgotPasswordFormType> =>
  Yup.object().shape({
    email: Yup.string().label(t('forgot_password.email')).email().required(),
  });

const defaultValues = { email: '' };

type Props = {
  onSubmit: (formValue: ForgotPasswordFormType) => Promise<any>;
};

export default function ForgotPasswordForm({ onSubmit }: Props) {
  const { t } = useTranslation();
  const hf = useForm<ForgotPasswordFormType>({
    resolver: yupResolver(ForgotPasswordSchema(t)),
    defaultValues,
  });

  return (
    <TemplateForm hf={hf} onSubmit={onSubmit}>
      <Controller
        name="email"
        control={hf.control}
        render={(field) => <TemplateTextField {...field} label={t('forgot_password.email')} />}
      />

      <TemplateFormActions>
        <TemplateFormSubmitButton>{t('forgot_password.send_request')}</TemplateFormSubmitButton>
      </TemplateFormActions>
    </TemplateForm>
  );
}
