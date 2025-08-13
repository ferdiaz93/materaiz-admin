import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import {
  TemplateForm,
  TemplateFormActions,
  TemplateFormSubmitButton,
  TemplateMultiSelectField,
  TemplateTextField,
} from 'src/components/form';
import { ROLES } from 'src/models/User';

export type EditUserFormType = {
  email: string;
  roles: string[];
};

type Props = {
  values: EditUserFormType;
  onSubmit: (value: EditUserFormType) => Promise<any>;
};

const EditUserSchema: Yup.ObjectSchema<EditUserFormType> = Yup.object().shape({
  email: Yup.string().required('Email es requerido').email(),
  roles: Yup.array()
    .min(1, 'Debes elegir al menos un rol')
    .required('Debes elegir al menos un rol'),
});

const defaultValues: EditUserFormType = {
  email: '',
  roles: [],
};

export default function AdminUserEditForm({ values, onSubmit }: Props) {
  const hf = useForm<EditUserFormType>({
    resolver: yupResolver(EditUserSchema),
    defaultValues,
    values,
    mode: 'onBlur',
  });

  return (
    <TemplateForm hf={hf} onSubmit={onSubmit}>
      <Controller name="email" render={(field) => <TemplateTextField {...field} label="Email" />} />
      <Controller
        name="roles"
        render={(field) => <TemplateMultiSelectField {...field} label="Roles" options={ROLES} />}
      />
      <TemplateFormActions>
        <TemplateFormSubmitButton>Guardar</TemplateFormSubmitButton>
      </TemplateFormActions>
    </TemplateForm>
  );
}
