import React from 'react';
import { useNavigate } from 'react-router';
//import { useCreateCategoryMutation } from 'src/api/categoryRepository';
import { useSnackbar } from 'src/components/snackbar';
import { PATHS } from 'src/routes/paths';
import CategoriesCreateForm, {
  CreateCategoryFormType,
} from 'src/features/categories/CategoriesCreateForm';
import CustomModal from 'src/components/custom-modal';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
};

export const CategoriesCreatePage: React.FC<Props> = ({ open, onClose, title }) => {
  const { enqueueSnackbar } = useSnackbar();
  //const createCategoryMutation = useCreateCategoryMutation();
  const navigate = useNavigate();

  const handleSubmit = async (values: CreateCategoryFormType) => {
    //await createCategoryMutation.mutateAsync(values);    // Comentado porque no hay backend
    enqueueSnackbar({ message: 'Categoría creda!' });
    navigate(PATHS.dashboard.categories.list);
  };

  return (
    <CustomModal open={open} onClose={onClose} title={title}>
      <CategoriesCreateForm onSubmit={handleSubmit} />
    </CustomModal>
  );
};

export default CategoriesCreatePage;
