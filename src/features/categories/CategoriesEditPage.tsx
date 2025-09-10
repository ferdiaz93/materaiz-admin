import { Card, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router';
import { useEditCategoryMutation, useCategoryQuery } from 'src/api/categoryRepository';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import { useSettingsContext } from 'src/components/settings';
import { useSnackbar } from 'src/components/snackbar';
import { PATHS } from 'src/routes/paths';
import CategoriesEditForm, {
  EditCategoryFormType,
} from 'src/features/categories/CategoriesEditForm';

export const CategoriesEditPage = () => {
  const params = useParams<{ id: string }>();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { themeStretch } = useSettingsContext();

  //const [currentTab, setCurrentTab] = useState('1');

  const editCategoryMutation = useEditCategoryMutation();
  const categoryQuery = useCategoryQuery(Number(params.id));

  const handleCategoryUpdate = async (values: EditCategoryFormType) => {
    await editCategoryMutation.mutateAsync({ ...values, id: Number(params.id) });
    enqueueSnackbar({ message: 'Categoría actualizada!' });
    navigate(PATHS.dashboard.categories.list);
  };

  return (
    <>
      <Helmet>
        <title> Panel Administrativo | MateRaiz</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Editar - Categoría"
          links={[{ name: 'Listado', href: PATHS.dashboard.categories.list }, { name: 'Editar' }]}
        />

        <Card sx={{ p: 3 }}>
          <CategoriesEditForm onSubmit={handleCategoryUpdate} values={categoryQuery.data} />
        </Card>
      </Container>
    </>
  );
};

export default CategoriesEditPage;
