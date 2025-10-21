import { Card, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { useCreateProductMutation } from 'src/api/productRepository';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { useSnackbar } from 'src/components/snackbar';
import { APP_NAME } from 'src/config';
import { PATHS } from 'src/routes/paths';
import ProductCreateForm, { CreateProductFormType } from './ProductCreateForm';

export const ProductsCreatePage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const createProductMutation = useCreateProductMutation();
  const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();

  const handleSubmit = async (values: CreateProductFormType) => {
    await createProductMutation.mutateAsync(values);
    enqueueSnackbar({ message: 'Producto agregado!' });
    navigate(PATHS.dashboard.products.list);
  };

  return (
    <>
      <Helmet>
        <title> Panel Administrativo | {APP_NAME}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Alta - Productos"
          links={[{ name: 'Listado', href: PATHS.dashboard.products.list }, { name: 'Alta' }]}
        />

        <Card sx={{ p: 3 }}>
          <ProductCreateForm onSubmit={handleSubmit} />
        </Card>
      </Container>
    </>
  );
};

export default ProductsCreatePage;
