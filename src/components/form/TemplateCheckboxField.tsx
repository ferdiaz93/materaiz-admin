import { Checkbox, CheckboxProps, FormControlLabel, InputLabel } from '@mui/material';
import { useId } from 'react';
import { FieldPath, FieldPathValue, FieldValues, Noop, RefCallBack } from 'react-hook-form';
import { BaseFieldProps } from './BaseFieldProps';
import { GridItem } from './GridItem';
import { INPUT_LABEL_DEFAULT_STYLES } from './styles';

export type TemplateCheckboxFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = BaseFieldProps<TFieldValues> &
  Omit<CheckboxProps, 'checked' | 'onChange' | 'onBlur' | 'name' | 'ref'> & {
    field: {
      onChange: (...event: any[]) => void;
      onBlur: Noop;
      value: FieldPathValue<TFieldValues, TName>;
      name: TName;
      ref: RefCallBack;
    };
    floatingLabel?: boolean;
  };

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

export const TemplateCheckboxField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  colSpan,
  field,
  floatingLabel = false,
  fieldState,
  formState,
  ...props
}: TemplateCheckboxFieldProps<TFieldValues, TName>) => {
  const id = useId();
  return (
    <GridItem colSpan={colSpan}>
      {!floatingLabel && (
        <InputLabel sx={{ ...INPUT_LABEL_DEFAULT_STYLES }} id={id} error={!!fieldState.error}>
          {label}
        </InputLabel>
      )}
      <FormControlLabel
        control={<Checkbox {...field} id={id} checked={Boolean(field.value)} {...props} />}
        label={floatingLabel ? label : undefined}
      />
    </GridItem>
  );
};
