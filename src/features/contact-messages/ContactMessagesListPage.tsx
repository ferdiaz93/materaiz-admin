import { Card, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useAllContactMessagesQuery } from 'src/api/contactMessageRepository';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { APP_NAME } from 'src/config';
import { ContactMessagesDataGrid } from './ContactMessagesDataGrid';

export function ContactMessagesListPage() {
  const { themeStretch } = useSettingsContext();
  const contactMessagesQuery = useAllContactMessagesQuery();

  return (
    <>
      <Helmet>
        <title> Consultas | {APP_NAME} </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs heading="Listado - Consultas" links={[{ name: 'Listado' }]} />

        <Card sx={{ height: 600 }}>
          <ContactMessagesDataGrid
            data={contactMessagesQuery.data}
            isLoading={contactMessagesQuery.isLoading}
          />
        </Card>
      </Container>
    </>
  );
}

export default ContactMessagesListPage;
