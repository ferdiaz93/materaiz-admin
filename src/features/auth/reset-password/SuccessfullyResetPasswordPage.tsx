import { Box, Button, Container, Typography } from '@mui/material';
import { m } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { MotionContainer, varBounce } from 'src/components/animate';
import Image from 'src/components/image';
import { useSettingsContext } from 'src/components/settings';
import { APP_NAME, HEADER, LOGO } from 'src/config';
import useOffSetTop from 'src/hooks/useOffSetTop';
import Header from 'src/layouts/compact/Header';
import { PATHS } from 'src/routes/paths';

const SuccessfullyResetPasswordPage = () => {
  const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();
  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);
  const { t } = useTranslation();

  const handleBackToLogin = () => {
    navigate(PATHS.auth.login);
  };

  return (
    <>
      <Header isOffset={isOffset} />
      <Helmet>
        <title>
          {' '}
          {t('success_reset_password.helmet_title')} | {APP_NAME}{' '}
        </title>
      </Helmet>
      <Box sx={{ height: '100%' }}>
        <Container
          maxWidth={themeStretch ? false : 'xl'}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
        >
          <MotionContainer>
            <m.div variants={varBounce().in}>
              <Typography
                variant="h3"
                paragraph
                color="white"
                sx={{ display: 'flex', justifyContent: 'center', color: 'text.primary' }}
              >
                {t('success_reset_password.title') + `${APP_NAME}!`}
              </Typography>
            </m.div>

            <m.div variants={varBounce().in}>
              <Typography
                sx={{ color: 'text.secondary', display: 'flex', justifyContent: 'center' }}
              >
                {t('success_reset_password.subtitle')}
              </Typography>
            </m.div>
            <m.div
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
              }}
              variants={varBounce().in}
            >
              <Image
                src={LOGO}
                style={{
                  height: 140,
                  width: 140,
                  marginTop: 20,
                  objectFit: 'contain',
                }}
              />
              <Button variant="contained" onClick={handleBackToLogin} sx={{ mx: 'auto', mt: 10 }}>
                {t('success_reset_password.go_to_login_button')}
              </Button>
            </m.div>
          </MotionContainer>
        </Container>
      </Box>
    </>
  );
};

export default SuccessfullyResetPasswordPage;
