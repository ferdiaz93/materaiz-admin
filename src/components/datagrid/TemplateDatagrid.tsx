import { Icon } from '@iconify/react';
import { Box, Button, ButtonProps, Card, Popover, Stack, Typography } from '@mui/material';
import {
  DataGrid,
  DataGridProps,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from '@mui/x-data-grid';
import { createContext, useContext, useState } from 'react';
import { FieldValues, FormProvider, UseFormReturn, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import noresults from 'src/assets/noresults.png';
import { useLocales } from 'src/locales';

type TemplateDatagridProps<TValue extends FieldValues> = DataGridProps & {
  toolbarProps?: {
    hideDensitySelector?: boolean;
    hideExport?: boolean;
    hideColumnsSelector?: boolean;
  };
  filter: {
    hf: UseFormReturn<TValue, any>;
    render: React.ReactNode;
    customFilterLogic?: { [key: string]: (params: { value: any; filterValue: any }) => boolean };
  };
};

function CustomToolbar(props: {
  filterComponent: React.ReactNode;
  onSearch: (values: any) => any;
  hideDensitySelector?: boolean;
  hideExport?: boolean;
  hideColumnsSelector?: boolean;
}) {
  const hf = useFormContext();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { t } = useTranslation();
  return (
    <>
      <FilterContext.Provider
        value={{
          onReset: () => {
            hf.reset();
            hf.handleSubmit((values) => {
              props.onSearch(values);
            })();
            setAnchorEl(null);
          },
        }}
      >
        <GridToolbarContainer>
          <Button
            size="small"
            startIcon={<Icon icon="mdi:filter-outline" />}
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            {t('field.filter')}
          </Button>
          {!props.hideColumnsSelector && <GridToolbarColumnsButton />}
          {!props.hideDensitySelector && <GridToolbarDensitySelector />}
          {!props.hideExport && <GridToolbarExport />}
        </GridToolbarContainer>
        <Popover
          open={anchorEl !== null}
          onClose={() => setAnchorEl(null)}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Box sx={{ p: 4, width: 800 }}>
            <form
              onSubmit={hf.handleSubmit((values) => {
                setAnchorEl(null);
                return props.onSearch(values);
              })}
            >
              {props.filterComponent}
            </form>
          </Box>
        </Popover>
      </FilterContext.Provider>
    </>
  );
}

export const TemplateDataGridFilterResetButton = (props: ButtonProps) => {
  const { onReset } = useFilterContext();
  const { t } = useTranslation();
  return (
    <Button
      variant="soft"
      color="error"
      startIcon={<Icon icon="mdi:trash" />}
      {...props}
      onClick={(ev) => {
        props.onClick && props.onClick(ev);
        onReset();
      }}
    >
      {props.children || t('field.reset')}
    </Button>
  );
};

export const TemplateDatagridFilterSubmitButton = (props: ButtonProps) => {
  const { t } = useTranslation();
  return (
    <Button variant="soft" type="submit" startIcon={<Icon icon="mdi:magnify" />} {...props}>
      {props.children || t('field.search')}
    </Button>
  );
};

export const FilterContext = createContext<{ onReset: () => any }>({} as any);

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FilterContext');
  }
  return context;
};

export const TemplateDatagrid = <TValue extends FieldValues>({
  filter,
  toolbarProps,
  ...props
}: TemplateDatagridProps<TValue>) => {
  const { hf } = filter;
  const [filters, setFilters] = useState(hf.getValues());
  const { currentLang } = useLocales();
  const { t } = useTranslation();

  const filteredData = props.rows.filter((row) =>
    Object.entries(filters).every(([key, value]) => {
      if (
        value === '' ||
        value === undefined ||
        value === null ||
        (Array.isArray(value) && value.length === 0)
      )
        return true;
      if (filter.customFilterLogic && filter.customFilterLogic[key]) {
        return filter.customFilterLogic[key]({ value: row[key], filterValue: value });
      }
      if (Array.isArray(value)) {
        if (typeof row[key] === 'string' || typeof row[key] === 'number') {
          return value.includes(row[key]);
        }
        if (Array.isArray(row[key])) {
          return value.some((x) => row[key].includes(x));
        }
      }
      if (typeof row[key] === 'string') {
        return row[key].toLowerCase().includes((value as any).toLowerCase());
      }
      if (typeof row[key] === 'number') {
        return String(row[key]) === String(value as any);
      }
      console.warn('Unhandled filter type', key, row[key], value);
      return true;
    })
  );

  return (
    <FormProvider {...hf}>
      <Card sx={{ height: 700 }}>
        <DataGrid
          {...props}
          rows={filteredData}
          slots={{
            toolbar: (props) => <CustomToolbar {...props} {...toolbarProps} />,
            noResultsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                <img src={noresults} alt="Sin Resultados" />
                <Typography>{t('field.no_results_for_search')}</Typography>
              </Stack>
            ),
            noRowsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                <img src={noresults} alt="Sin Resultados" />
                <Typography>{t('field.no_results_for_search')}</Typography>
              </Stack>
            ),
            ...props.slots,
          }}
          disableColumnFilter
          slotProps={{
            toolbar: {
              filterComponent: filter.render,
              onSearch: setFilters,
            },
            ...props.slotProps,
          }}
          localeText={currentLang.datagridLocale.components.MuiDataGrid.defaultProps.localeText}
        />
      </Card>
    </FormProvider>
  );
};
