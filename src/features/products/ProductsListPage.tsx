import { Button, Card, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { useAllProductsQuery, useDeleteProductMutation } from 'src/api/productRepository';
import { useConfirm } from 'src/components/confirm-action/ConfirmAction';
import { PATHS } from 'src/routes/paths';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import { ProductsDataGrid } from './ProductsDataGrid';
import { APP_NAME } from 'src/config';

export function ProductsListPage() {
  const { themeStretch } = useSettingsContext();
  const confirm = useConfirm();
  const productsQuery = useAllProductsQuery();
  const deleteProductMutation = useDeleteProductMutation();

  return (
    <>
      <Helmet>
        <title> Productos | {APP_NAME} </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Listado - Productos"
          links={[{ name: 'Listado' }]}
          action={
            <Button
              to={PATHS.dashboard.products.create}
              component={RouterLink}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Nuevo Producto
            </Button>
          }
        />

        <Card
          sx={{
            height: 600,
          }}
        >
          <ProductsDataGrid
            data={productsQuery.data}
            isLoading={productsQuery.isLoading}
            onDelete={(id) =>
              confirm({
                action: () => deleteProductMutation.mutateAsync(id),
              })
            }
          />
        </Card>
      </Container>
    </>
  );
}

export default ProductsListPage;
