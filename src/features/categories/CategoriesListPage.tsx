import { Button, Card, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { useDeleteCategoryMutation } from 'src/api/categoryRepository';
import { useConfirm } from 'src/components/confirm-action/ConfirmAction';
import { PATHS } from 'src/routes/paths';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Iconify from '../../components/iconify';
import { useSettingsContext } from '../../components/settings';
import { CategoriesDataGrid } from 'src/features/categories/CategoriesDataGrid';
import { APP_NAME } from 'src/config';
import { Category } from 'src/models/Category';

export function CategoriesListPage() {
  const { themeStretch } = useSettingsContext();
  const confirm = useConfirm();
  const deleteCategoryMutation = useDeleteCategoryMutation();

  const categories: Category[] = [
    {
      id: 1,
      name: 'Mate',
    },
    {
      id: 2,
      name: 'Termo',
    },
  ];

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
              to={PATHS.dashboard.categories.create}
              component={RouterLink}
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
      </Container>
    </>
  );
}

export default CategoriesListPage;
