import { Button, Card, Container } from '@mui/material';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAllCategoriesQuery, useDeleteCategoryMutation } from 'src/api/categoryRepository';
import { useConfirm } from 'src/components/confirm-action/ConfirmAction';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Iconify from '../../components/iconify';
import { useSettingsContext } from '../../components/settings';
import { CategoriesDataGrid } from 'src/features/categories/CategoriesDataGrid';
import { APP_NAME } from 'src/config';
import CategoriesCreateModal from './CategoriesCreateModal';

export function CategoriesListPage() {
  const { themeStretch } = useSettingsContext();
  const confirm = useConfirm();
  const deleteCategoryMutation = useDeleteCategoryMutation();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const { data: categories = [] } = useAllCategoriesQuery();

  return (
    <>
      <Helmet>
        <title> Panel Administrativo | {APP_NAME} </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Listado - Categorías"
          links={[{ name: 'Listado' }]}
          action={
            <Button
              onClick={() => setOpenCreateModal(true)}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Nueva Categoría
            </Button>
          }
        />

        <Card
          sx={{
            height: 600,
          }}
        >
          <CategoriesDataGrid
            data={categories}
            isLoading={false}
            onDelete={(id) =>
              confirm({
                action: () => deleteCategoryMutation.mutateAsync(id),
              })
            }
          />
        </Card>
        <CategoriesCreateModal
          open={openCreateModal}
          onClose={() => setOpenCreateModal(false)}
          title="Crear Categoría"
        />
      </Container>
    </>
  );
}

export default CategoriesListPage;
