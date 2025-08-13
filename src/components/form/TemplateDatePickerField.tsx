import { InputLabel, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useId } from 'react';
import { FieldValues } from 'react-hook-form';
import { GridItem } from './GridItem';
import { TemplateTextFieldProps } from './TemplateTextField';
import { INPUT_LABEL_DEFAULT_STYLES } from './styles';

/**
 * Mui DatePicker wrapper.
 * @param colSpan Column span
 * @param field Arguments supplied by the Controller render method
 * @param floatingLabel Optional argument to have a separate label from the input. It is enable by default.
 * @example
 * <Controller
 *    name="birthDate"
 *    control={hf.control}
 *    render={(field) => <TemplateDatePickerField {...field} label="Birth Date" floatingLabel/>}
 *  />
 */

export const TemplateDatePickerField = <TValue extends FieldValues>({
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
      {!floatingLabel ? (
        <InputLabel htmlFor={id} sx={INPUT_LABEL_DEFAULT_STYLES} error={!!fieldState.error}>
          {label}
        </InputLabel>
      ) : null}
      <DatePicker
        {...field}
        label={floatingLabel ? label : undefined}
        slotProps={{
          textField: {
            fullWidth: true,
            error: !!fieldState.error,
            helperText: fieldState.error?.message ?? '',
            ...props,
          },
        }}
      />
    </GridItem>
  );
};
