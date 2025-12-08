import { InputLabel, FormHelperText, Box } from '@mui/material';
import { useId } from 'react';
import { FieldPath, FieldValues, RefCallBack } from 'react-hook-form';
import { BaseFieldProps } from './BaseFieldProps';
import { GridItem } from './GridItem';
import { INPUT_LABEL_DEFAULT_STYLES } from './styles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export type TemplateRichTextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = BaseFieldProps<TFieldValues> & {
  field: {
    onChange: (...event: any[]) => void;
    onBlur: (...event: any[]) => void;
    value: string;
    name: TName;
    ref?: RefCallBack;
  };
  fieldState: any;
  floatingLabel?: boolean;
  children?: React.ReactNode;
};

export const TemplateRichTextField = <TValue extends FieldValues>({
  label,
  colSpan,
  field,
  fieldState,
  floatingLabel = false,
  children,
}: TemplateRichTextFieldProps<TValue>) => {
  const id = useId();

  return (
    <GridItem colSpan={colSpan}>
      {!floatingLabel ? (
        <InputLabel htmlFor={id} sx={INPUT_LABEL_DEFAULT_STYLES} error={!!fieldState.error}>
          {label}
        </InputLabel>
      ) : null}

      <Box
        id={id}
        sx={{
          border: '1px solid',
          borderColor: fieldState.error ? 'error.main' : 'grey.400',
          borderRadius: 1,
          '&:hover': {
            borderColor: fieldState.error ? 'error.dark' : 'grey.600',
          },
          p: 1,
          '& .ql-container': {
            minHeight: '120px',
          },
          '& .ql-editor': {
            fontFamily: 'inherit',
            fontSize: '1rem',
          },
        }}
      >
        <ReactQuill
          theme="snow"
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
        />
        {children}
      </Box>

      {fieldState.error && <FormHelperText error>{fieldState.error.message}</FormHelperText>}
    </GridItem>
  );
};
