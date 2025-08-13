import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Alert, Box, Grid, Link, Stack } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { TemplateForm } from 'src/components/form/TemplateForm';
import {
  TemplateFormActions,
  TemplateFormSubmitButton,
} from 'src/components/form/TemplateFormActions';
import { TemplatePasswordField } from 'src/components/form/TemplatePasswordField';
import { TemplateTextField } from 'src/components/form/TemplateTextField';
import { ENABLED_FEATURES } from 'src/config';
import { PATHS } from 'src/routes/paths';
import { useAuthContext } from '../useAuthContext';
import { TFunction, useTranslation } from 'react-i18next';
// routes

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  password: string;
  afterSubmit?: string;
};

const LoginSchema = (t: TFunction<'translation', undefined>) =>
  Yup.object().shape({
    email: Yup.string().label('Email').email().required(),
    password: Yup.string().required().label(t('login.password')),
  });

const defaultValues = {
  email: '',
  password: '',
};

export default function AuthLoginForm() {
  const { login } = useAuthContext();
  const { t } = useTranslation();
  const hf = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema(t)),
    defaultValues,
  });

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await login({ email: data.email, password: data.password });
    } catch (error) {
      console.error(error);

      hf.reset();

      hf.setError('afterSubmit', {
        ...error,
        message: error.message,
      });
    }
  };

  return (
    <Box>
      {!!hf.formState.errors.afterSubmit && (
        <Alert severity="error" sx={{ marginBottom: 4 }}>
          {hf.formState.errors.afterSubmit?.message}
        </Alert>
      )}
      <TemplateForm hf={hf} onSubmit={onSubmit}>
        <Controller
          name="email"
          render={(props) => (
            <TemplateTextField {...props} label="Email" placeholder="john_doe@example.com" />
          )}
        />
        <Controller
          name="password"
          render={(props) => (
            <TemplatePasswordField {...props} label={t('login.password')} placeholder="********" />
          )}
        />

        {ENABLED_FEATURES.FORGOT_PASSWORD && (
          <Grid item xs={12}>
            <Stack alignItems="flex-end">
              <Link
                to={PATHS.auth.forgotPassword}
                component={RouterLink}
                variant="body2"
                color="inherit"
                underline="always"
              >
                {t('login.forgot_password')}
              </Link>
            </Stack>
          </Grid>
        )}

        <TemplateFormActions>
          <TemplateFormSubmitButton
            fullWidth
            size="large"
            sx={{
              bgcolor: 'text.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
              '&:hover': {
                bgcolor: 'text.primary',
                color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
              },
            }}
          >
            {t('login.access')}
          </TemplateFormSubmitButton>
        </TemplateFormActions>
      </TemplateForm>
    </Box>
  );
}
