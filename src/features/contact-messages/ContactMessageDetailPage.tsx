import { Box, Card, Container, Divider, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { PATHS } from 'src/routes/paths';
import { useContactMessageQuery } from 'src/api/contactMessageRepository';
import LoadingScreen from 'src/components/loading-screen';
import moment from 'moment';
import { APP_NAME } from 'src/config';
import { formatText } from 'src/utils/formatText';

export const ContactMessageDetailPage = () => {
  const params = useParams<{ id: string }>();
  const { themeStretch } = useSettingsContext();

  const messageQuery = useContactMessageQuery(Number(params.id));

  if (messageQuery.isLoading) return <LoadingScreen />;

  const message = messageQuery.data;

  return (
    <>
      <Helmet>
        <title>Detalle de consulta | {APP_NAME}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Detalle de consulta"
          links={[
            { name: 'Consultas', href: PATHS.dashboard.contactMessages.list },
            { name: `Consulta #${params.id}` },
          ]}
        />

        <Card sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Información del remitente
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Box sx={{ display: 'grid', gap: 1 }}>
            <Typography>
              <Typography component="span" fontWeight="bold">
                Nombre:
              </Typography>{' '}
              {formatText(message.first_name)} {formatText(message.last_name)}
            </Typography>

            <Typography>
              <Typography component="span" fontWeight="bold">
                Email:
              </Typography>{' '}
              {message.email}
            </Typography>

            <Typography>
              <Typography component="span" fontWeight="bold">
                Fecha:
              </Typography>{' '}
              {moment(message.created_at).format('DD/MM/YYYY HH:mm')}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Mensaje
          </Typography>

          <Typography sx={{ whiteSpace: 'pre-line' }}>{message.message}</Typography>
        </Card>
      </Container>
    </>
  );
};

export default ContactMessageDetailPage;
