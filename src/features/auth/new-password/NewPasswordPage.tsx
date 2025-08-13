import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { Link, Typography } from '@mui/material';
// routes

// assets

import { useUpdatePasswordMutation } from 'src/api/AuthRepository';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { APP_NAME } from 'src/config';
import { PATHS } from 'src/routes/paths';
import { SentIcon } from '../../../assets/icons';
import AuthNewPasswordForm, { UpdatePasswordFormValueType } from './AuthNewPasswordForm';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

export default function NewPasswordPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { enqueueSnackbar } = useSnackbar();
  const updatePasswordMutation = useUpdatePasswordMutation();

  const handleSubmit = async (formValues: UpdatePasswordFormValueType) => {
    await updatePasswordMutation.mutateAsync(formValues);
    enqueueSnackbar({ message: t('reset_password.password_updated') });
    navigate(PATHS.auth.login);
  };

  return (
    <>
      <Helmet>
        <title>
          {' '}
          {t('reset_password.new_password')} | {APP_NAME}
        </title>
      </Helmet>

      <SentIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant="h3" paragraph>
        {t('reset_password.request_sent_successfully')}
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        {t('reset_password.subtitle_1')}
        <br />
        {t('reset_password.subtitle_2')}
      </Typography>

      <AuthNewPasswordForm onSubmit={handleSubmit} />

      <Typography variant="body2" sx={{ my: 3 }}>
        {t('reset_password.dont_have_code')} &nbsp;
        <Link variant="subtitle2">{t('reset_password.resend_code')}</Link>
      </Typography>

      <Link
        to={PATHS.auth.login}
        component={RouterLink}
        color="inherit"
        variant="subtitle2"
        sx={{
          mx: 'auto',
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:chevron-left-fill" width={16} />
        {t('reset_password.return')}
      </Link>
    </>
  );
}
