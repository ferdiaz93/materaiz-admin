import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { Link, Typography } from '@mui/material';
// routes

// components
import Iconify from '../../../components/iconify';

// assets
import { useVerifyCodeMutation } from 'src/api/AuthRepository';
import { useSnackbar } from 'src/components/snackbar';
import { APP_NAME } from 'src/config';
import { PATHS } from 'src/routes/paths';
import { EmailInboxIcon } from '../../../assets/icons';
import AuthVerifyCodeForm, { VerifyCodeFormType } from './AuthVerifyCodeForm';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

export default function VerifyCodePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const verifyCodeMutation = useVerifyCodeMutation();

  const handleSubmit = async (formValue: VerifyCodeFormType) => {
    await verifyCodeMutation.mutateAsync(formValue);
    enqueueSnackbar({ message: t('verify.code_verified') });
    navigate(PATHS.auth.login);
  };

  return (
    <>
      <Helmet>
        <title>
          {t('verify.title')} | {APP_NAME}
        </title>
      </Helmet>

      <EmailInboxIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant="h3" paragraph>
        {t('verify.subtitle')}
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 5 }}>{t('verify.subtitle_1')}</Typography>

      <AuthVerifyCodeForm onSubmit={handleSubmit} />

      <Typography variant="body2" sx={{ my: 3 }}>
        {t('verify.dont_have_code')} &nbsp;
        <Link variant="subtitle2">{t('verify.resend_code')}</Link>
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
        {t('verify.return')}
      </Link>
    </>
  );
}
