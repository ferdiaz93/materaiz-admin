import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
// @mui
import { TemplateForm } from 'src/components/form/TemplateForm';
import {
  TemplateFormActions,
  TemplateFormSubmitButton,
} from 'src/components/form/TemplateFormActions';
import { TemplateNumberField } from 'src/components/form/TemplateNumberField';
import { TFunction, useTranslation } from 'react-i18next';
// routes

// ----------------------------------------------------------------------

export type VerifyCodeFormType = {
  code: string;
};

const VerifyCodeSchema = (
  t: TFunction<'translation', undefined>
): Yup.ObjectSchema<VerifyCodeFormType> =>
  Yup.object().shape({
    code: Yup.string().required().label(t('code')),
  });

const defaultValues: VerifyCodeFormType = {
  code: '',
};

type Props = {
  onSubmit: (formValue: VerifyCodeFormType) => Promise<any>;
};

export default function AuthVerifyCodeForm({ onSubmit }: Props) {
  const { t } = useTranslation();
  const hf = useForm({
    mode: 'onBlur',
    resolver: yupResolver(VerifyCodeSchema(t)),
    defaultValues,
  });

  return (
    <TemplateForm hf={hf} onSubmit={onSubmit}>
      <Controller
        name="code"
        control={hf.control}
        render={(field) => <TemplateNumberField {...field} label={t('code')} />}
      />

      <TemplateFormActions>
        <TemplateFormSubmitButton>{t('verify.verify')}</TemplateFormSubmitButton>
      </TemplateFormActions>
    </TemplateForm>
  );
}
