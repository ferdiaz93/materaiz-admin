import { InputLabel, TextField, TextFieldProps } from '@mui/material';
import { useId } from 'react';
import { FieldPath, FieldValues, Noop, RefCallBack } from 'react-hook-form';
import { BaseFieldProps } from './BaseFieldProps';
import { GridItem } from './GridItem';
import { INPUT_LABEL_DEFAULT_STYLES } from './styles';

export type TemplateTextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = BaseFieldProps<TFieldValues> &
  TextFieldProps & {
    field: {
      onChange: (...event: any[]) => void;
      onBlur: Noop;
      value: string;
      name: TName;
      ref: RefCallBack;
    };
    floatingLabel?: boolean;
  };

/**
 * Mui TextField wrapper.
 * Check TemplateEmailField, TemplateNumberField, TemplatePasswordField or TemplatePhoneField for more specific components.
 * @param colSpan Column span
 * @param field Arguments supplied by the Controller render method
 * @param floatingLabel Optional argument to have a separate label from the input. It is enable by default.
 * @example
 * <Controller
 *    name="title"
 *    control={hf.control}
 *    render={(field) => <TemplateTextField {...field} label="Title" floatingLabel/>}
 *  />
 */

export const TemplateTextField = <TValue extends FieldValues>({
  label,
  colSpan,
  placeholder,
  field,
  fieldState,
  floatingLabel = false,
  formState,
  required,
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
      <TextField
        {...field}
        id={id}
        fullWidth
        label={floatingLabel ? label : undefined}
        placeholder={placeholder}
        error={!!fieldState.error}
        helperText={fieldState.error?.message ?? ''}
        {...props}
      />
    </GridItem>
  );
};
