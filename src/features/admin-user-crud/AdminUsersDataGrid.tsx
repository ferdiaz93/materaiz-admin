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
import {
  TemplateFormActions,
  TemplateFormGrid,
  TemplateMultiAutocompleteField,
  TemplateTextField,
} from 'src/components/form';

import Iconify from 'src/components/iconify';
import MenuPopover from 'src/components/menu-popover';
import { ROLES, User } from 'src/models/User';
import { PATHS } from 'src/routes/paths';

interface Props {
  data: User[];
  isLoading: boolean;
  onDelete: (id: number) => any;
}

export const AdminUsersDataGrid: React.FC<Props> = ({ data, isLoading, onDelete }) => {
  const hf = useForm({
    defaultValues: { email: '', roles: [] },
  });
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const selectedIdRef = useRef<number | undefined>();

  const columns = useColumns<(typeof data)[0]>([
    {
      field: 'email',
      headerName: 'Email',
      type: 'string',
    },
    {
      field: 'roles',
      headerName: 'Roles',
      type: 'array',
      renderAs: 'badge',
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
                name="email"
                render={(field) => (
                  <TemplateTextField {...field} label="Email" placeholder="john_doe@example.com" />
                )}
              />
              <Controller
                name="roles"
                render={(field) => (
                  <TemplateMultiAutocompleteField
                    {...field}
                    label="Roles"
                    options={ROLES}
                    placeholder="Selecciona roles"
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

        <MenuItem component={Link} to={PATHS.dashboard.adminUsers.edit(selectedIdRef.current!)}>
          <Iconify icon="eva:edit-fill" />
          Editar
        </MenuItem>
      </MenuPopover>
    </Box>
  );
};
