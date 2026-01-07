import { Box, Card, Container, Divider, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { PATHS } from 'src/routes/paths';
import { useOrderQuery, useMarkOrderAsShippedMutation } from 'src/api/orderRepository';
import LoadingScreen from 'src/components/loading-screen';
import moment from 'moment';
import { APP_NAME } from 'src/config';
import { LoadingButton } from '@mui/lab';
import { formatText } from 'src/utils/formatText';
import { useSnackbar } from 'src/components/snackbar';

export const OrdersDetailPage = () => {
  const params = useParams<{ id: string }>();
  const { enqueueSnackbar } = useSnackbar();
  const { themeStretch } = useSettingsContext();
  const orderQuery = useOrderQuery(Number(params.id));
  const markShippedMutation = useMarkOrderAsShippedMutation();
  if (orderQuery.isLoading) return <LoadingScreen />;

  const order = orderQuery.data;

  const handleMarkAsShipped = async () => {
    try {
      await markShippedMutation.mutateAsync(order.id);

      enqueueSnackbar({
        message: 'Orden marcada como enviada',
        variant: 'success',
      });
    } catch (err: any) {
      console.error(err);

      enqueueSnackbar({
        message: 'Error al actualizar',
        variant: 'error',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Detalle de compra | {APP_NAME}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Detalle de la compra"
          links={[
            { name: 'Compras', href: PATHS.dashboard.orders.list },
            { name: `Compra #${params.id}` },
          ]}
        />
        {order.is_home_delivery && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <LoadingButton
              variant="contained"
              loading={markShippedMutation.isLoading}
              onClick={handleMarkAsShipped}
              disabled={order.is_shipped}
            >
              {order.is_shipped ? 'Ya enviado' : 'Marcar como enviado'}
            </LoadingButton>
          </Box>
        )}

        <Card sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Información del cliente
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'grid', gap: 1 }}>
            <Typography>
              <Typography component="span" fontWeight="bold">
                Cliente:
              </Typography>{' '}
              {formatText(order.first_name)} {formatText(order.last_name)}
            </Typography>
            <Typography>
              <Typography component="span" fontWeight="bold">
                Email:
              </Typography>{' '}
              {order.email}
            </Typography>
            <Typography>
              <Typography component="span" fontWeight="bold">
                Teléfono:
              </Typography>{' '}
              {order.phone}
            </Typography>
            <Typography>
              <Typography component="span" fontWeight="bold">
                Fecha:
              </Typography>{' '}
              {moment(order.created_at).format('DD/MM/YYYY HH:mm')}
            </Typography>
            <Typography>
              <Typography component="span" fontWeight="bold">
                Tipo de entrega:
              </Typography>{' '}
              {order.is_home_delivery ? 'Envío a domicilio' : 'Flete a coordinar con el vendedor'}
            </Typography>
            {order.is_home_delivery && (
              <Typography>
                <Typography component="span" fontWeight="bold">
                  Estado del envío:
                </Typography>{' '}
                {order.is_shipped ? 'Enviado' : 'Pendiente'}
              </Typography>
            )}
            {order.address && (
              <Typography>
                <Typography component="span" fontWeight="bold">
                  Dirección:
                </Typography>{' '}
                {formatText(order.address)}
              </Typography>
            )}
            <Typography>
              <Typography component="span" fontWeight="bold">
                Total:
              </Typography>{' '}
              ${Number(order.total_amount).toLocaleString()}
            </Typography>
          </Box>
        </Card>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Productos comprados
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {order.items?.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #eee',
                py: 1.5,
              }}
            >
              <Box>
                <Typography component="span" fontWeight="bold">
                  {item.product_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cantidad: {item.quantity} {item.quantity === 1 ? 'unidad' : 'unidades'}
                </Typography>

                {item.addons && item.addons.length > 0 && (
                  <Typography variant="body2" color="text.secondary">
                    Cantidad de bombillas adicionales: {item.addons.length}
                  </Typography>
                )}

                {item.addons && item.addons.length > 0 && (
                  <Box sx={{ mt: 0.5 }}>
                    {item.addons.map((addon, index) => (
                      <Typography key={index} variant="body2" sx={{ fontStyle: 'italic', ml: 2 }}>
                        ↳ + Bombilla: {addon.description} (+${Number(addon.price).toLocaleString()})
                      </Typography>
                    ))}
                  </Box>
                )}
              </Box>
              <Typography>${(Number(item.unit_price) * item.quantity).toLocaleString()}</Typography>
            </Box>
          ))}

          {order.is_home_delivery && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #eee',
                py: 1.5,
              }}
            >
              <Box>
                <Typography component="span" fontWeight="bold">
                  Costo de envío
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Envío a domicilio
                </Typography>
              </Box>

              <Typography>${Number(order.shipping_cost).toLocaleString()}</Typography>
            </Box>
          )}

          <Divider sx={{ my: 2 }} />

          <Typography align="right" variant="subtitle1">
            <Typography component="span" fontWeight="bold">
              Total:
            </Typography>{' '}
            ${Number(order.total_amount).toLocaleString()}
          </Typography>
        </Card>
      </Container>
    </>
  );
};

export default OrdersDetailPage;
