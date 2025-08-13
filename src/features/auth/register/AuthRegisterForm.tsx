import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  TemplateForm,
  TemplateFormActions,
  TemplatePasswordField,
  TemplateTextField,
} from 'src/components/form';
import { TFunction, useTranslation } from 'react-i18next';

// auth

// ----------------------------------------------------------------------

export type RegisterFormType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const RegisterSchema = (
  t: TFunction<'translation', undefined>
): Yup.ObjectSchema<RegisterFormType> =>
  Yup.object().shape({
    firstName: Yup.string().required().label(t('first_name')),
    lastName: Yup.string().required().label(t('last_name')),
    email: Yup.string().email().required().label(t('email')),
    password: Yup.string().required().label(t('password')),
  });

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

type Props = {
  onSubmit: (values: RegisterFormType) => Promise<any>;
};

export default function AuthRegisterForm({ onSubmit }: Props) {
  const { t } = useTranslation();
  const hf = useForm<RegisterFormType>({
    mode: 'onBlur',
    resolver: yupResolver(RegisterSchema(t)),
    defaultValues,
  });

  return (
    <TemplateForm hf={hf} onSubmit={onSubmit}>
      <Controller
        name="firstName"
        control={hf.control}
        render={(field) => <TemplateTextField {...field} label={t('first_name')} />}
      />
      <Controller
        name="lastName"
        control={hf.control}
        render={(field) => <TemplateTextField {...field} label={t('last_name')} />}
      />
      <Controller
        name="email"
        control={hf.control}
        render={(field) => <TemplateTextField {...field} label={t('email')} />}
      />
      <Controller
        name="password"
        control={hf.control}
        render={(field) => <TemplatePasswordField {...field} label={t('password')} />}
      />

      <TemplateFormActions>
        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={hf.formState.isSubmitting}
          sx={{
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'text.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            },
          }}
        >
          {t('register.create_account')}
        </LoadingButton>
      </TemplateFormActions>
    </TemplateForm>
  );
}
