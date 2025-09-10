import { Card, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
//import { useCreateCategoryMutation } from 'src/api/categoryRepository';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { useSnackbar } from 'src/components/snackbar';
import { APP_NAME } from 'src/config';
import { PATHS } from 'src/routes/paths';
import CategoriesCreateForm, {
  CreateCategoryFormType,
} from 'src/features/categories/CategoriesCreateForm';

export const CategoriesCreatePage = () => {
  const { enqueueSnackbar } = useSnackbar();
  //const createCategoryMutation = useCreateCategoryMutation();
  const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();

  const handleSubmit = async (values: CreateCategoryFormType) => {
    //await createCategoryMutation.mutateAsync(values);    // Comentado porque no hay backend
    enqueueSnackbar({ message: 'Categoría creda!' });
    navigate(PATHS.dashboard.categories.list);
  };

  return (
    <>
      <Helmet>
        <title> Panel Administrativo | {APP_NAME}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Alta - Categorías"
          links={[{ name: 'Listado', href: PATHS.dashboard.categories.list }, { name: 'Alta' }]}
        />

        <Card sx={{ p: 3 }}>
          <CategoriesCreateForm onSubmit={handleSubmit} />
        </Card>
      </Container>
    </>
  );
};

export default CategoriesCreatePage;
