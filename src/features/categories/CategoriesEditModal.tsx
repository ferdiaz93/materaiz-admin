import React from 'react';
import { useEditCategoryMutation, useCategoryQuery } from 'src/api/categoryRepository';
import { useSnackbar } from 'src/components/snackbar';
import CategoriesEditForm, {
  EditCategoryFormType,
} from 'src/features/categories/CategoriesEditForm';
import CustomModal from 'src/components/custom-modal';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  categoryId: number;
};

export const CategoriesEditPage: React.FC<Props> = ({ open, onClose, title, categoryId }) => {
  const { enqueueSnackbar } = useSnackbar();

  const { mutateAsync: editCategoryMutation } = useEditCategoryMutation();
  const { data: categoryQuery } = useCategoryQuery(categoryId);

  const handleCategoryUpdate = async (values: EditCategoryFormType) => {
    await editCategoryMutation({ ...values, id: categoryId });
    enqueueSnackbar({ message: 'Categoría actualizada!' });
    onClose();
  };

  return (
    <CustomModal open={open} onClose={onClose} title={title}>
      <CategoriesEditForm onSubmit={handleCategoryUpdate} values={categoryQuery} />
    </CustomModal>
  );
};

export default CategoriesEditPage;
