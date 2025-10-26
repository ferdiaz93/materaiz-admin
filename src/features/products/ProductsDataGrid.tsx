import { IconButton, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import {
  TemplateDataGridFilterResetButton,
  TemplateDatagrid,
  TemplateDatagridFilterSubmitButton,
  useColumns,
} from 'src/components/datagrid';
import { TemplateFormActions, TemplateFormGrid, TemplateTextField } from 'src/components/form';

import Iconify from 'src/components/iconify';
import MenuPopover from 'src/components/menu-popover';
import { Product } from 'src/models/Product';
import { PATHS } from 'src/routes/paths';

interface Props {
  data: Product[];
  isLoading: boolean;
  onDelete: (id: number) => any;
}

export const ProductsDataGrid: React.FC<Props> = ({ data, isLoading, onDelete }) => {
  const hf = useForm({
    defaultValues: { name: '' },
  });
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const selectedIdRef = useRef<number | undefined>();

  const columns = useColumns<(typeof data)[0]>([
    {
      field: 'name',
      headerName: 'Nombre',
      type: 'string',
    },

    {
      field: 'action',
      headerName: 'Acciones',
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
                  <TemplateTextField {...field} label="Nombre" placeholder="Ej: Mate y bombilla" />
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

        <MenuItem component={Link} to={PATHS.dashboard.products.edit(selectedIdRef.current!)}>
          <Iconify icon="eva:edit-fill" />
          Editar
        </MenuItem>
      </MenuPopover>
    </Box>
  );
};
