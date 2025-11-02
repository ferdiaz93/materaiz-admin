import { Card, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useAllOrdersQuery, useDeleteOrderMutation } from 'src/api/OrderRepository';
import { useConfirm } from 'src/components/confirm-action/ConfirmAction';
import { OrdersDataGrid } from './OrdersDataGrid';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { APP_NAME } from 'src/config';

export function OrdersListPage() {
  const { themeStretch } = useSettingsContext();
  const confirm = useConfirm();
  const ordersQuery = useAllOrdersQuery();
  const deleteOrderMutation = useDeleteOrderMutation();

  return (
    <>
      <Helmet>
        <title> Órdenes | {APP_NAME} </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs heading="Listado - Órdenes" links={[{ name: 'Listado' }]} />

        <Card sx={{ height: 600 }}>
          <OrdersDataGrid
            data={ordersQuery.data}
            isLoading={ordersQuery.isLoading}
            onDelete={(id) =>
              confirm({
                action: () => deleteOrderMutation.mutateAsync(id),
              })
            }
          />
        </Card>
      </Container>
    </>
  );
}

export default OrdersListPage;
