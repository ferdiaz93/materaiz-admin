import { m } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useRouteError } from 'react-router-dom';
// @mui
import { Button, Container, Typography } from '@mui/material';
// components
import { MotionContainer, varBounce } from '../components/animate';
// assets
import { SeverErrorIllustration } from '../assets/illustrations';
import { APP_NAME } from 'src/config';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

export default function ErrorPage() {
  let error = useRouteError();
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Error | {APP_NAME}</title>
      </Helmet>
      <Container maxWidth="lg">
        <MotionContainer
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <m.div variants={varBounce().in}>
            <Typography variant="h3" paragraph>
              Error
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <Typography>{t('error.subtitle')}</Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <Typography sx={{ color: 'text.secondary' }}>
              {(error as any)?.message ?? t('error.error_default_message')}
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
          </m.div>

          <Button to="/" component={RouterLink} size="large" variant="contained">
            {t('error.go_to_home')}
          </Button>
        </MotionContainer>
      </Container>
    </>
  );
}
