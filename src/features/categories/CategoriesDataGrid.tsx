import { IconButton, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  TemplateDataGridFilterResetButton,
  TemplateDatagrid,
  TemplateDatagridFilterSubmitButton,
  useColumns,
} from 'src/components/datagrid';
import { TemplateFormActions, TemplateFormGrid, TemplateTextField } from 'src/components/form';

import Iconify from 'src/components/iconify';
import MenuPopover from 'src/components/menu-popover';
import { Category } from 'src/models/Category';
import CategoriesEditModal from './CategoriesEditModal';

interface Props {
  data: Category[];
  isLoading: boolean;
  onDelete: (id: number) => any;
}

export const CategoriesDataGrid: React.FC<Props> = ({ data, isLoading, onDelete }) => {
  const hf = useForm({
    defaultValues: { name: '' },
  });
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const selectedIdRef = useRef<number | undefined>();

  const handleOnCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedCategoryId(null);
  };

  const columns = useColumns<(typeof data)[0]>([
    {
      field: 'name',
      headerName: 'Category',
      type: 'string',
    },
    {
      field: 'action',
      headerName: 'Actions',
      type: 'actions',
      renderCell: (params) => (
        <>
          <IconButton
            onClick={(e) => {
              selectedIdRef.current = Number(params.id);
              setOpenPopover(e.currentTarget);
            }}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </>
      ),
    },
  ]);

  return (
    <Box sx={{ height: 600 }}>
      <TemplateDatagrid
        filter={{
          hf,
          render: (
            <TemplateFormGrid>
              <Controller
                name="name"
                render={(field) => (
                  <TemplateTextField {...field} label="Categoría" placeholder="Buscar por nombre" />
                )}
              />
              <TemplateFormActions>
                <TemplateDataGridFilterResetButton />
                <TemplateDatagridFilterSubmitButton />
              </TemplateFormActions>
            </TemplateFormGrid>
          ),
        }}
        disableRowSelectionOnClick
        rows={data}
        columns={columns}
      />

      <MenuPopover
        open={openPopover}
        onClose={() => {
          setOpenPopover(null);
          selectedIdRef.current = undefined;
        }}
        arrow="right-top"
      >
        <MenuItem
          onClick={() => {
            setOpenPopover(null);
            onDelete(selectedIdRef.current!);
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Eliminar
        </MenuItem>

        <MenuItem
          onClick={() => {
            setOpenEditModal(true);
            setSelectedCategoryId(selectedIdRef.current!);
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Editar
        </MenuItem>
      </MenuPopover>
      {selectedCategoryId && (
        <CategoriesEditModal
          open={openEditModal}
          onClose={handleOnCloseEditModal}
          title="Editar Categoría"
          categoryId={selectedCategoryId}
        />
      )}
    </Box>
  );
};
