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
import { Order } from 'src/models/Order';
import { PATHS } from 'src/routes/paths';
import { Link } from 'react-router-dom';
import { formatText } from 'src/utils/formatText';

interface Props {
  data: Order[];
  isLoading: boolean;
  onDelete: (id: number) => any;
}

export const OrdersDataGrid: React.FC<Props> = ({ data, isLoading, onDelete }) => {
  const hf = useForm({
    defaultValues: { customer: '', email: '' },
  });
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const selectedIdRef = useRef<number | undefined>();

  const columns = useColumns<(typeof data)[0]>([
    {
      field: 'id',
      headerName: 'ID',
      type: 'string',
    },
    {
      field: 'customer',
      headerName: 'Cliente',
      type: 'string',
      valueGetter: (params) => formatText(`${params.row.first_name} ${params.row.last_name}`),
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'string',
    },
    {
      field: 'total_amount',
      headerName: 'Total',
      type: 'string',
      valueGetter: (params) => `$${Number(params.value).toLocaleString()}`,
    },
    {
      field: 'action',
      headerName: 'Acciones',
      type: 'actions',
      renderCell: (params) => (
        <IconButton
          onClick={(e) => {
            selectedIdRef.current = Number(params.id);
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
                name="customer"
                render={(field) => (
                  <TemplateTextField {...field} label="Cliente" placeholder="Buscar por nombre" />
                )}
              />
              <Controller
                name="email"
                render={(field) => (
                  <TemplateTextField {...field} label="Email" placeholder="Buscar por email" />
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
        loading={isLoading}
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

        <MenuItem component={Link} to={PATHS.dashboard.orders.details(selectedIdRef.current!)}>
          <Iconify icon="eva:eye-fill" />
          Ver detalles
        </MenuItem>
      </MenuPopover>
    </Box>
  );
};
