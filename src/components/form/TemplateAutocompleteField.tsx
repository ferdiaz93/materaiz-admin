import {
  Autocomplete,
  AutocompleteProps,
  FormControl,
  FormHelperText,
  InputLabel,
  TextField,
} from '@mui/material';
import { ReactNode, useId } from 'react';
import { FieldPath, FieldPathValue, FieldValues, Noop, RefCallBack } from 'react-hook-form';
import { BaseFieldProps } from './BaseFieldProps';
import { GridItem } from './GridItem';
import { INPUT_LABEL_DEFAULT_STYLES } from './styles';

export type TemplateAutocompleteFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = BaseFieldProps<TFieldValues> &
  Omit<
    AutocompleteProps<
      { value: FieldPathValue<TFieldValues, TName>; label: ReactNode },
      false,
      false,
      false
    >,
    'options' | 'renderInput' | 'renderOption'
  > & {
    options: { value: FieldPathValue<TFieldValues, TName>; label: ReactNode }[];
    field: {
      onChange: (...event: any[]) => void;
      onBlur: Noop;
      value: FieldPathValue<TFieldValues, TName>;
      name: TName;
      ref: RefCallBack;
    };
    floatingLabel?: boolean;
    placeholder?: string;
  };

/**
 * Mui Autocomplete wrapper.
 * @param colSpan Column span
 * @param options Options to be displayed in the autocomplete
 * @param label Label to be displayed
 * @param field Arguments supplied by the Controller render method
 * @param fieldState Arguments supplied by the Controller render method
 * @param floatingLabel Optional argument to have a separate label from the input. It is enable by default.
 * @example
 * <Controller
 *    name="country"
 *    control={hf.control}
 *    render={(field) => <TemplateAutocompleteField
 *      {...field}
 *      label="Country"
 *      floatingLabel
 *      options={[{label: "Spain", value: "ES"}]}
 *    />}
 *  />
 */

export const TemplateAutocompleteField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  colSpan,
  options,
  placeholder,
  floatingLabel = false,
  field,
  fieldState,
  formState,
  ...autocompleteProps
}: TemplateAutocompleteFieldProps<TFieldValues, TName>) => {
  const id = useId();

  // Tipo para las opciones del autocomplete
  type OptionType = { value: FieldPathValue<TFieldValues, TName>; label: ReactNode };

  // Type guard para verificar si un objeto tiene la propiedad 'value'
  const hasValueProperty = (obj: any): obj is OptionType =>
    typeof obj === 'object' && obj !== null && 'value' in obj && typeof obj.value !== 'undefined';

  // Type guard para verificar si es un valor primitivo
  const isPrimitiveValue = (obj: any): obj is FieldPathValue<TFieldValues, TName> =>
    typeof obj !== 'object' || obj === null;

  return (
    <GridItem colSpan={colSpan}>
      {!floatingLabel && (
        <InputLabel sx={{ ...INPUT_LABEL_DEFAULT_STYLES }} id={id} error={!!fieldState.error}>
          {label}
        </InputLabel>
      )}
      <FormControl fullWidth sx={{ marginTop: !floatingLabel ? 1 : undefined }}>
        {floatingLabel && <InputLabel id={id}>{label}</InputLabel>}
        <Autocomplete
          {...field}
          {...autocompleteProps}
          options={options}
          getOptionLabel={(
            option: FieldPathValue<TFieldValues, TName> | OptionType | null
          ): string => {
            if (option === null) return '';
            if (typeof option === 'string') return option;
            if (typeof option === 'object' && option !== null) {
              const optionAny = option as any;
              if (typeof optionAny.value !== 'undefined') {
                const foundOption = options.find((x) => x.value === optionAny.value);
                return foundOption ? String(foundOption.label) : '';
              }
            }
            const foundOption = options.find((x) => x.value === option);
            return foundOption ? String(foundOption.label) : '';
          }}
          isOptionEqualToValue={(
            option: OptionType,
            value: FieldPathValue<TFieldValues, TName> | OptionType | null
          ): boolean => {
            if (value === null) return false;
            if (typeof value === 'string') return option.value === value;
            if (typeof value === 'object' && value !== null) {
              const valueAny = value as any;
              if (typeof valueAny.value !== 'undefined') {
                return option.value === valueAny.value;
              }
            }
            return option.value === value;
          }}
          onChange={(event, newValue) => {
            field.onChange(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={floatingLabel ? label : undefined}
              error={!!fieldState.error}
              placeholder={placeholder}
            />
          )}
        />
        <FormHelperText error={!!fieldState.error}>
          {fieldState.error?.message ?? ''}
        </FormHelperText>
      </FormControl>
    </GridItem>
  );
};
