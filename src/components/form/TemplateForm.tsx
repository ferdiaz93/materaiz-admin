import { Grid } from '@mui/material';
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';

export type GridColumnStyle = number | { xs: number; sm?: number; md?: number };

export type TemplateFormProps<TValue extends FieldValues> = {
  onSubmit: (values: TValue) => Promise<any>;
  columns?: GridColumnStyle;
  children: React.ReactNode;
  hf: UseFormReturn<TValue, any>;
};

/**
 * Template form component
 * @param onSubmit Function to be called when the form is submitted
 * @param columns Number of columns to be used in the grid
 * @param children Children to be rendered inside the form
 * @param hf object returned by useForm hook from react-hook-form
 *
 * @example
 * const hf = useForm();
 * <TemplateForm hf={hf} onSubmit={onSubmit}>
 *  <Controller
 *    name="name"
 *    control={hf.control}
 *    render={(field) => <TemplateTextField {...field} label="Name"/>}
 *  />
 * </TemplateForm>
 */
export const TemplateForm = <TValue extends FieldValues>({
  onSubmit,
  columns,
  children,
  hf,
}: TemplateFormProps<TValue>) => {
  const catchedOnSubmit = async (value: TValue) => {
    try {
      await onSubmit(value);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <FormProvider {...hf}>
      <form onSubmit={hf.handleSubmit(catchedOnSubmit)}>
        <TemplateFormGrid columns={columns}>{children}</TemplateFormGrid>
      </form>
    </FormProvider>
  );
};

export const TemplateFormGrid = ({
  columns = 12,
  children,
}: {
  columns?: GridColumnStyle;
  children: React.ReactNode;
}) => (
  <Grid container columns={columns} spacing={2}>
    {children}
  </Grid>
);
