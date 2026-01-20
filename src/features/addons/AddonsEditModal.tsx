import React from 'react';
import { useSnackbar } from 'src/components/snackbar';
import CustomModal from 'src/components/custom-modal';
import AddonsEditForm, { EditAddonFormType } from './AddonsEditForm';
import { AddonDetail, useEditAddonMutation } from 'src/api/addonRepository';

type Props = {
  open: boolean;
  onClose: () => void;
  addon: AddonDetail | null;
};

export const AddonsEditModal: React.FC<Props> = ({ open, onClose, addon }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: updateAddon, isLoading } = useEditAddonMutation();

  if (!addon) return null;

  const handleUpdate = async (values: EditAddonFormType) => {
    try {
      await updateAddon({
        key: addon.key,
        data: values,
      });
      enqueueSnackbar({ message: 'Addon actualizado correctamente!', variant: 'success' });
      onClose();
    } catch (error) {
      enqueueSnackbar({ message: 'Error al actualizar', variant: 'error' });
    }
  };

  return (
    <CustomModal open={open} onClose={onClose} title={`Editar: ${addon.name}`}>
      <AddonsEditForm
        onSubmit={handleUpdate}
        values={{
          name: addon.name,
          price: addon.price,
          description: addon.description || '',
        }}
        isLoading={isLoading}
      />
    </CustomModal>
  );
};

export default AddonsEditModal;