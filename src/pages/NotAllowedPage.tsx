import { Button, Container, Typography } from '@mui/material';
import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ForbiddenIllustration } from 'src/assets/illustrations';
import { MotionContainer, varBounce } from 'src/components/animate';
import { Link as RouterLink } from 'react-router-dom';

const NotAllowedPage = () => {
  const { t } = useTranslation();

  return (
    <Container component={MotionContainer} sx={{ textAlign: 'center' }}>
      <m.div variants={varBounce().in}>
        <Typography variant="h3" paragraph>
          {t('not_allowed.title')}
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography sx={{ color: 'text.secondary' }}>{t('not_allowed.subtitle')}</Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
      </m.div>

      <Button to="/" component={RouterLink} size="large" variant="contained">
        {t('error404.return')}
      </Button>
    </Container>
  );
};
export default NotAllowedPage;
