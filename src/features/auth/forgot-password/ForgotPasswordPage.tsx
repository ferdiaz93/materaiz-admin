import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { Link, Typography } from '@mui/material';
// routes
import { PATHS } from '../../../routes/paths';
// components
import Iconify from '../../../components/iconify';
// sections

// assets
import { useForgotPasswordMutation } from 'src/api/AuthRepository';
import { useSnackbar } from 'src/components/snackbar';
import { APP_NAME } from 'src/config';
import { PasswordIcon } from '../../../assets/icons';
import ForgotPasswordForm, { ForgotPasswordFormType } from './ForgotPasswordForm';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

export default function ForgotPasswordPage() {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const forgotPasswordMutation = useForgotPasswordMutation();

  const handleSubmit = async (formValue: ForgotPasswordFormType) => {
    await forgotPasswordMutation.mutateAsync(formValue);
    enqueueSnackbar(t('email_sent'));
    navigate(PATHS.auth.login);
  };

  return (
    <>
      <Helmet>
        <title>
          {t('forgot_password.header')} | {APP_NAME}
        </title>
      </Helmet>

      <PasswordIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant="h3" paragraph>
        {t('forgot_password.title')}
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        {t('forgot_password.subtitle')}
      </Typography>

      <ForgotPasswordForm onSubmit={handleSubmit} />

      <Link
        to={PATHS.auth.login}
        component={RouterLink}
        color="inherit"
        variant="subtitle2"
        sx={{
          mt: 3,
          mx: 'auto',
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:chevron-left-fill" width={16} />
        {t('forgot_password.return')}
      </Link>
    </>
  );
}
