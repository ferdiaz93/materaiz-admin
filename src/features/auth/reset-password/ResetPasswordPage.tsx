// @mui
import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { APP_NAME, LOGO } from 'src/config';
import { PATHS } from 'src/routes/paths';
import { Helmet } from 'react-helmet-async';
import { useResetPasswordMutation } from 'src/api/AuthRepository';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'src/components/snackbar';
import ResetPasswordForm, { ResetPasswordFormValuesProps } from './ResetPasswordForm';

function getTokenFromURL(url: string) {
  const split = url.split('/');
  return split[split.length - 1];
}

export default function ResetPasswordPage() {
  const token = getTokenFromURL(window.location.href);
  const { mutateAsync: resetPassword } = useResetPasswordMutation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const handleSubmit = async (form: ResetPasswordFormValuesProps) => {
    try {
      await resetPassword({
        password: form.password,
        token,
        password_confirmation: form.password_confirmation,
        email: form.email,
      });
      enqueueSnackbar(t('token_reset_password.email_successfully_sent'), { variant: 'success' });
      navigate(PATHS['successfully-reset-password'].root);
    } catch (error) {
      enqueueSnackbar(t('token_reset_password.email_error_message'), { variant: 'error' });
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {t('token_reset_password.helmet_title')} | {APP_NAME}{' '}
        </title>
      </Helmet>
      <Stack justifyContent="center" alignItems="center" gap="40px">
        <Stack justifyContent="center" alignItems="center" gap="24px">
          <img src={LOGO} alt="logo" height="100px" width="100px" />
          <Stack gap="12px">
            <Typography variant="h3" fontWeight={800}>
              {t('token_reset_password.title')}
            </Typography>
            <Typography variant="caption" fontSize="17px">
              {t('token_reset_password.subtitle')}
            </Typography>
          </Stack>
        </Stack>
        <ResetPasswordForm onSubmit={handleSubmit} />
      </Stack>
    </>
  );
}
