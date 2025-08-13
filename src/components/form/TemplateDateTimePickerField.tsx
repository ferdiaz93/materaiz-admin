import { InputLabel, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useId } from 'react';
import { FieldValues } from 'react-hook-form';
import { GridItem } from './GridItem';
import { TemplateTextFieldProps } from './TemplateTextField';
import { INPUT_LABEL_DEFAULT_STYLES } from './styles';

/**
 * Mui DateTimePicker wrapper.
 * @param colSpan Column span
 * @param field Arguments supplied by the Controller render method
 * @param floatingLabel Optional argument to have a separate label from the input. It is enable by default.
 * @example
 * <Controller
 *    name="appointment"
 *    control={hf.control}
 *    render={(field) => <TemplateDateTimePickerField {...field} label="Appointment" floatingLabel/>}
 *  />
 */

export const TemplateDateTimePickerField = <TValue extends FieldValues>({
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
      <DateTimePicker
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
