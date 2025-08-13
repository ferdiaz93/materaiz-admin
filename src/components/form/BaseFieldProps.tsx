import { ControllerFieldState, FieldValues, UseFormStateReturn } from 'react-hook-form';
import { GridColumnStyle } from './TemplateForm';

export type BaseFieldProps<TFieldValues extends FieldValues = FieldValues> = {
  label: string;
  colSpan?: GridColumnStyle;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<TFieldValues>;
  placeholder?: string;
};
