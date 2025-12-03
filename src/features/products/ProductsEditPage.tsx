import { Card, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router';
import { useSnackbar } from 'src/components/snackbar';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { PATHS } from 'src/routes/paths';
import { useProductQuery, useEditProductMutation } from 'src/api/productRepository';
import ProductEditForm, { EditProductFormType } from './ProductEditForm';
import { useAllCategoriesQuery } from 'src/api/categoryRepository';

export const ProductsEditPage = () => {
  const params = useParams<{ id: string }>();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { themeStretch } = useSettingsContext();

  const productQuery = useProductQuery(Number(params.id));
  const categoriesQuery = useAllCategoriesQuery();
  const editProductMutation = useEditProductMutation();

  const handleProductUpdate = async (values: EditProductFormType) => {
    await editProductMutation.mutateAsync({ ...values, id: Number(params.id) });
    enqueueSnackbar({ message: 'Producto actualizado!' });
    navigate(PATHS.dashboard.products.list);
  };

  return (
    <>
      <Helmet>
        <title> Panel Administrativo | Editar Producto </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Editar - Producto"
          links={[{ name: 'Listado', href: PATHS.dashboard.products.list }, { name: 'Editar' }]}
        />

        <Card sx={{ p: 3 }}>
          {productQuery.data && categoriesQuery.data && (
            <ProductEditForm
              onSubmit={handleProductUpdate}
              values={{
                name: productQuery.data.name ?? '',
                original_price: productQuery.data.original_price,
                discount_price:
                  productQuery.data.discount_price ?? productQuery.data.original_price,
                category_id: productQuery.data.category_id,
              }}
              categories={categoriesQuery.data}
            />
          )}
        </Card>
      </Container>
    </>
  );
};

export default ProductsEditPage;
