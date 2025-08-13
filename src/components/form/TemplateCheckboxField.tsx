import { Checkbox, FormControlLabel, InputLabel } from '@mui/material';
import { useId } from 'react';
import { FieldValues } from 'react-hook-form';
import { GridItem } from './GridItem';
import { TemplateTextFieldProps } from './TemplateTextField';
import { INPUT_LABEL_DEFAULT_STYLES } from './styles';

/**
 * Mui Checkbox wrapper.
 * @param colSpan Column span
 * @param field Arguments supplied by the Controller render method
 * @param floatingLabel Optional argument to have a separate label from the input. It is enable by default.
 * @example
 * <Controller
 *    name="terms"
 *    control={hf.control}
 *    render={(field) => <TemplateCheckboxField {...field} label="Accept terms" />}
 *  />
 */

export const TemplateCheckboxField = <TValue extends FieldValues>({
  label,
  colSpan,
  field,
  floatingLabel = false,
  fieldState,
  ...props
}: TemplateTextFieldProps<TValue>) => {
  const id = useId();
  return (
    <GridItem colSpan={colSpan}>
      {!floatingLabel && (
        <InputLabel sx={{ ...INPUT_LABEL_DEFAULT_STYLES }} id={id} error={!!fieldState.error}>
          {label}
        </InputLabel>
      )}
      <FormControlLabel
        control={
          <Checkbox
            {...field}
            id={id}
            checked={field.value}
            error={!!fieldState.error}
            {...props}
          />
        }
        label={floatingLabel ? label : undefined}
      />
    </GridItem>
  );
};
