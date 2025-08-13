import { Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from 'src/api/AuthRepository';
import { useSnackbar } from 'src/components/snackbar';
import LoginLayout from 'src/layouts/login';
import { PATHS } from 'src/routes/paths';
import AuthWithSocial from '../login/AuthWithSocial';
import AuthRegisterForm, { RegisterFormType } from './AuthRegisterForm';
import { useTranslation } from 'react-i18next';

export default function Register() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const registerMutation = useRegisterMutation();

  const handleSubmit = async (formValues: RegisterFormType) => {
    await registerMutation.mutateAsync(formValues);
    enqueueSnackbar(t('register.register_completed'));
    navigate(PATHS.auth.verify);
  };

  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">{t('register.title')}</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">{t('register.already_have_account')}</Typography>

          <Link to={PATHS.auth.login} component={RouterLink} variant="subtitle2">
            {t('register.sign_in')}
          </Link>
        </Stack>
      </Stack>

      <AuthRegisterForm onSubmit={handleSubmit} />

      <Typography
        component="div"
        sx={{ color: 'text.secondary', mt: 3, typography: 'caption', textAlign: 'center' }}
      >
        {`${t('register.by_signing_up')} `}
        <Link underline="always" color="text.primary">
          {`${t('register.terms_of_service')}`}
        </Link>
        {` ${t('register.and')} `}
        <Link underline="always" color="text.primary">
          {`${t('register.privacy_policy')}`}
        </Link>
        .
      </Typography>

      <AuthWithSocial />
    </LoginLayout>
  );
}
