// @mui
import { Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ENABLED_FEATURES } from 'src/config';
import LoginLayout from 'src/layouts/login/LoginLayout';
import { PATHS } from 'src/routes/paths';
import AuthLoginForm from './AuthLoginForm';
import AuthWithSocial from './AuthWithSocial';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

export default function Login() {
  const { t } = useTranslation();

  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">{t('login.log_in')}</Typography>
        {ENABLED_FEATURES.REGISTER && (
          <Stack direction="row" spacing={0.5}>
            <Typography variant="body2">{t('login.new_user')}</Typography>

            <Link to={PATHS.auth.register} component={RouterLink} variant="subtitle2">
              {t('login.create_account')}
            </Link>
          </Stack>
        )}
      </Stack>
      <AuthLoginForm />
      {ENABLED_FEATURES.LOGIN_SOCIAL && <AuthWithSocial />}
    </LoginLayout>
  );
}
