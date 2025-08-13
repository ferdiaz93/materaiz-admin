// routes
// theme
import ThemeProvider from './theme';
// locales
import ThemeLocalization from './locales';
// components

import moment from 'moment';
import 'moment/dist/locale/es';
import { IntlProvider } from 'react-intl';
import { Outlet } from 'react-router';
import { MotionLazyContainer } from './components/animate';
import { ConfirmActionProvider } from './components/confirm-action/ConfirmAction';
import ScrollToTop from './components/scroll-to-top';
import { ThemeSettings } from './components/settings';
import SnackbarProvider from './components/snackbar/SnackbarProvider';
import { AuthProvider } from './features/auth/AuthContext';
import SpanishLang from './lang/es.json';
moment.locale('es');
// ----------------------------------------------------------------------

const locale = 'es';
const lang = SpanishLang;

export default function App() {
  return (
    <AuthProvider>
      <IntlProvider messages={lang} locale={locale} defaultLocale="en">
        <MotionLazyContainer>
          <ThemeProvider>
            <ThemeSettings>
              <ThemeLocalization>
                <SnackbarProvider>
                  <ConfirmActionProvider
                    defaultProps={{
                      title: 'Atención',
                      content: '¿Está seguro que desea eliminar este item?',
                      actionLabel: 'Eliminar',
                      cancelLabel: 'Cancelar',
                    }}
                  >
                    <ScrollToTop />
                    <Outlet />
                  </ConfirmActionProvider>
                </SnackbarProvider>
              </ThemeLocalization>
            </ThemeSettings>
          </ThemeProvider>
        </MotionLazyContainer>
      </IntlProvider>
    </AuthProvider>
  );
}
