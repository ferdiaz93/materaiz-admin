import { Box, Button, Card, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { useDeleteProductMutation, usePaginatedProductsQuery } from 'src/api/productRepository';
import { useConfirm } from 'src/components/confirm-action/ConfirmAction';
import { PATHS } from 'src/routes/paths';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import { ProductsDataGrid } from './ProductsDataGrid';
import { APP_NAME } from 'src/config';
import TablePaginationCustom from 'src/components/table/TablePaginationCustom';
import { useState } from 'react';

export function ProductsListPage() {
  const { themeStretch } = useSettingsContext();
  const confirm = useConfirm();
  const deleteProductMutation = useDeleteProductMutation();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const { data, isLoading, isFetching } = usePaginatedProductsQuery(page, rowsPerPage);
  const products = data?.products ?? [];
  const pagination = data?.pagination;
  const total = pagination?.total ?? 0;
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRows = parseInt(event.target.value, 10);
    setRowsPerPage(newRows);
    setPage(1);
  };
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

        <Card sx={{ minHeight: 600, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flex: 1, overflow: 'auto' }}>
            <ProductsDataGrid
              data={products}
              isLoading={isLoading || isFetching}
              onDelete={(id) =>
                confirm({
                  action: () => deleteProductMutation.mutateAsync(id),
                })
              }
            />
          </Box>
          {/* Paginación */}
          <TablePaginationCustom
            count={total}
            page={page - 1}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 20, 25, 50, 100]}
            sx={{
              borderTop: 1,
              borderColor: 'divider',
              backgroundColor: 'background.paper',
              flexShrink: 0,
            }}
          />
        </Card>
      </Container>
    </>
  );
}

export default ProductsListPage;
