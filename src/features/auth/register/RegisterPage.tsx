import { Helmet } from 'react-helmet-async';
import { APP_NAME } from 'src/config';
import Register from './Register';
import { useTranslation } from 'react-i18next';
// sections

// ----------------------------------------------------------------------

export default function RegisterPage() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>
          {' '}
          {t('register.header')} | {APP_NAME}
        </title>
      </Helmet>

      <Register />
    </>
  );
}
