import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Alert, Box } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { TemplateForm } from 'src/components/form/TemplateForm';
import {
  TemplateFormActions,
  TemplateFormSubmitButton,
} from 'src/components/form/TemplateFormActions';
import { TemplatePasswordField } from 'src/components/form/TemplatePasswordField';
import { TemplateTextField } from 'src/components/form/TemplateTextField';
import { useTranslation } from 'react-i18next';
// routes

// ----------------------------------------------------------------------

export type ResetPasswordFormValuesProps = {
  password: string;
  password_confirmation: string;
  email: string;
  afterSubmit?: string;
};

const defaultValues = {
  password: '',
  password_confirmation: '',
  email: '',
};

type Props = {
  onSubmit: (formValue: ResetPasswordFormValuesProps) => Promise<any>;
};

export default function ResetPasswordForm({ onSubmit }: Props) {
  const { t } = useTranslation();

  const ResetPasswordSchema: Yup.Schema<ResetPasswordFormValuesProps> = Yup.object().shape({
    password: Yup.string().required(t('token_reset_password.form_password_error_required')),
    password_confirmation: Yup.string()
      .oneOf(
        [Yup.ref('password'), undefined],
        t('token_reset_password.form_password_confirmation_error_passwords_must_match')
      )
      .required(t('token_reset_password.form_password_confirmation_error_required')),
    email: Yup.string().email().required(t('token_reset_password.form_email_error_required')),
  });

  const hf = useForm<ResetPasswordFormValuesProps>({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues,
  });

  return (
    <Box sx={{ m: 0, minWidth: '600px' }}>
      {!!hf.formState.errors.afterSubmit && (
        <Alert severity="error" sx={{ marginBottom: 4 }}>
          {hf.formState.errors.afterSubmit?.message}
        </Alert>
      )}
      <TemplateForm hf={hf} onSubmit={onSubmit}>
        <Controller
          name="email"
          render={(props) => (
            <TemplateTextField
              {...props}
              placeholder="juan@gmail.com"
              label={t('token_reset_password.email_label')}
              floatingLabel={true}
            />
          )}
        />
        <Controller
          name="password"
          render={(props) => (
            <TemplatePasswordField
              {...props}
              placeholder="•••••••"
              label={t('token_reset_password.password_label')}
              floatingLabel={true}
            />
          )}
        />
        <Controller
          name="password_confirmation"
          render={(props) => (
            <TemplatePasswordField
              {...props}
              placeholder="•••••••"
              label={t('token_reset_password.confirm_password_label')}
              floatingLabel={true}
            />
          )}
        />
        <TemplateFormActions>
          <TemplateFormSubmitButton
            fullWidth
            size="large"
            sx={{
              bgcolor: '#263c7a',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
              '&:hover': {
                bgcolor: 'text.primary',
                color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
              },
            }}
          >
            {t('token_reset_password.reset_password_button')}
          </TemplateFormSubmitButton>
        </TemplateFormActions>
      </TemplateForm>
    </Box>
  );
}
