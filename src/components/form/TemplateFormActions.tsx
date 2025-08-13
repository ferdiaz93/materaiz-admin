import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { Button, Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { GridItem } from './GridItem';
import { GridColumnStyle } from './TemplateForm';

/**
 * Form submit button. It will be disabled and loding while the form is submitting.
 * @example
 * <TemplateForm hf={hf} onSubmit={onSubmit}>
 *  <TemplateFormActions>
 *    <TemplateFormSubmitButton>Reset</TemplateFormSubmitButton>
 *  </TemplateFormActions>
 * </TemplateForm>
 */

export const TemplateFormSubmitButton = (props: LoadingButtonProps) => {
  const hf = useFormContext();
  return (
    <LoadingButton
      variant="contained"
      type="submit"
      disabled={hf.formState.isSubmitting}
      loading={hf.formState.isSubmitting}
      {...props}
    />
  );
};
/**
 * Form actions row
 * @example
 * <TemplateForm hf={hf} onSubmit={onSubmit}>
 *  <TemplateFormActions>
 *    <TemplateFormSubmitButton>Submit</TemplateFormSubmitButton>
 *  </TemplateFormActions>
 * </TemplateForm>
 */

export const TemplateFormActions = ({
  children,
  colSpan = 12,
}: {
  children: React.ReactNode;
  colSpan?: GridColumnStyle;
}) => (
  <GridItem colSpan={colSpan}>
    <Stack direction="row" gap={2} justifyContent="flex-end">
      {children}
    </Stack>
  </GridItem>
);
/**
 * Form reset button
 * @example
 * <TemplateForm hf={hf} onSubmit={onSubmit}>
 *  <TemplateFormActions>
 *    <TemplateFormResetButton>Reset</TemplateFormResetButton>
 *  </TemplateFormActions>
 * </TemplateForm>
 */

export const TemplateFormResetButton = ({ children }: { children: React.ReactNode }) => {
  const hf = useFormContext();
  return (
    <Button variant="outlined" disabled={hf.formState.isSubmitting} onClick={() => hf.reset()}>
      {children}
    </Button>
  );
};
