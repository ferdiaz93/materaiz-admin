import { Card, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { APP_NAME } from 'src/config';
import { AddonDetail, useAddonDetailsQuery } from 'src/api/addonRepository';
import { AddonsDataGrid } from './AddonsDataGrid'; 
import { useState } from 'react';
import AddonsEditModal from './AddonsEditModal';

export function AddonsListPage() {
  const { themeStretch } = useSettingsContext();
  const { data, isLoading } = useAddonDetailsQuery();

  const [selectedAddon, setSelectedAddon] = useState<AddonDetail | null>(null);

  const handleEdit = (addon: AddonDetail) => {
    setSelectedAddon(addon);
  };

  const handleCloseModal = () => {
    setSelectedAddon(null);
  };

  return (
    <>
      <Helmet>
        <title> Extras y personalizaciones | {APP_NAME} </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Extras y personalizaciones"
          links={[{ name: 'Configuración' }]}
        />

        <Card sx={{ mt: 3 }}>
          <AddonsDataGrid
            data={data ?? []}
            isLoading={isLoading}
            onEdit={handleEdit}
          />
        </Card>
      </Container>
      <Card sx={{ mt: 3 }}>
        <AddonsDataGrid
          data={data ?? []}
          isLoading={isLoading}
          onEdit={handleEdit}
        />
      </Card>

      <AddonsEditModal
        open={!!selectedAddon}
        onClose={handleCloseModal}
        addon={selectedAddon}
      />
    </>
  );
}

export default AddonsListPage;