import { FormControlLabel, InputLabel, Switch, SwitchProps } from '@mui/material';
import { useId } from 'react';
import { FieldPath, FieldPathValue, FieldValues, Noop, RefCallBack } from 'react-hook-form';
import { BaseFieldProps } from './BaseFieldProps';
import { GridItem } from './GridItem';
import { INPUT_LABEL_DEFAULT_STYLES } from './styles';

export type TemplateSwitchFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = BaseFieldProps<TFieldValues> &
  Omit<SwitchProps, 'checked' | 'onChange' | 'onBlur' | 'name' | 'ref'> & {
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
 * Mui Switch wrapper.
 * @param colSpan Column span
 * @param field Arguments supplied by the Controller render method
 * @param floatingLabel Optional argument to have a separate label from the input. It is enable by default.
 * @example
 * <Controller
 *    name="active"
 *    control={hf.control}
 *    render={(field) => <TemplateSwitchField {...field} label="Active" />}
 *  />
 */

export const TemplateSwitchField = <
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
}: TemplateSwitchFieldProps<TFieldValues, TName>) => {
  const id = useId();
  return (
    <GridItem colSpan={colSpan}>
      {!floatingLabel && (
        <InputLabel sx={{ ...INPUT_LABEL_DEFAULT_STYLES }} id={id} error={!!fieldState.error}>
          {label}
        </InputLabel>
      )}
      <FormControlLabel
        control={<Switch {...field} id={id} checked={Boolean(field.value)} {...props} />}
        label={floatingLabel ? label : undefined}
      />
    </GridItem>
  );
};
