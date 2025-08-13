import { m } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Button, Typography } from '@mui/material';
// components
import { MotionContainer, varBounce } from '../components/animate';
// assets
import { PageNotFoundIllustration } from '../assets/illustrations';
import { APP_NAME } from 'src/config';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

export default function Page404() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>
          {' '}
          {t('error404.header')} | {APP_NAME}
        </title>
      </Helmet>

      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            {t('error404.title')}
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>{t('error404.subtitle')}</Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <PageNotFoundIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>

        <Button to="/" component={RouterLink} size="large" variant="contained">
          {t('error404.return')}
        </Button>
      </MotionContainer>
    </>
  );
}
