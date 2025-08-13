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

export type TemplateFreeAutocompleteFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = BaseFieldProps<TFieldValues> &
  Omit<
    AutocompleteProps<FieldPathValue<TFieldValues, TName>, false, false, true>,
    'options' | 'renderInput'
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
 * Mui Autocomplete free solo wrapper. It allows to enter any value, not only the ones in the options list.
 * @param colSpan Column span
 * @param options Options to be displayed in the autocomplete
 * @param label Label to be displayed
 * @param field Arguments supplied by the Controller render method
 * @param fieldState Arguments supplied by the Controller render method
 * @param floatingLabel Optional argument to have a separate label from the input. It is enable by default.
 * @example
 * <Controller
 *    name="category"
 *    control={hf.control}
 *    render={(field) => <TemplateFreeAutocompleteField
 *      {...field}
 *      label="Category"
 *      floatingLabel
 *      options={[{label: "Technology", value: "tech"}]}
 *    />}
 *  />
 */

export const TemplateFreeAutocompleteField = <TValue extends FieldValues>({
  label,
  colSpan,
  options,
  placeholder,
  floatingLabel = false,
  field,
  fieldState,
  ...autocompleteProps
}: TemplateFreeAutocompleteFieldProps<TValue>) => {
  const id = useId();
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
          freeSolo
          options={options}
          getOptionLabel={(option) => {
            if (typeof option === 'string') return option;
            return options.find((x) => x.value === option)?.label || '';
          }}
          isOptionEqualToValue={(option, value) => option.value === value}
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
