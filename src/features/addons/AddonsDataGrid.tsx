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
import { AddonDetail } from 'src/api/addonRepository'; 

interface Props {
  data: AddonDetail[];
  isLoading: boolean;
  onEdit: (addon: AddonDetail) => void; 
}

export const AddonsDataGrid: React.FC<Props> = ({ data, isLoading, onEdit }) => {
  const hf = useForm({
    defaultValues: { name: '' },
  });
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const selectedAddonRef = useRef<AddonDetail | undefined>();

  const columns = useColumns<AddonDetail>([
    {
      field: 'name',
      headerName: 'Nombre',
      type: 'string',
    },
    {
      field: 'price',
      headerName: 'Precio',
      type: 'number',
      valueFormatter: (params) => `$${Number(params.value).toLocaleString('es-AR')}`,
    },
    {
      field: 'action',
      headerName: 'Acciones',
      type: 'actions',
      width: 80,
      renderCell: (params) => (
        <IconButton
          onClick={(e) => {
            selectedAddonRef.current = params.row;
            setOpenPopover(e.currentTarget);
          }}
        >
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
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
                  <TemplateTextField
                    {...field}
                    label="Nombre"
                    placeholder="Ej: Diseño personalizado"
                  />
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
        getRowId={(row) => row.key}
        loading={isLoading}
      />

      <MenuPopover
        open={openPopover}
        onClose={() => {
          setOpenPopover(null);
          selectedAddonRef.current = undefined;
        }}
        arrow="right-top"
      >
        <MenuItem
          onClick={() => {
            if (selectedAddonRef.current) {
              onEdit(selectedAddonRef.current);
            }
            setOpenPopover(null);
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Editar
        </MenuItem>
      </MenuPopover>
    </Box>
  );
};