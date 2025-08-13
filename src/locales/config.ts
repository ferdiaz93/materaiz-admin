// @mui
import { enUS as SystemEnUs, esES as SystemEsEs } from '@mui/material/locale';
import * as YupLocales from 'yup-locales';
import { esES as DataGridEsEs, enUS as DataGridEnUs } from '@mui/x-data-grid';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: SystemEnUs,
    icon: '/assets/icons/flags/ic_flag_en.svg',
    yupLocale: YupLocales.en,
    datagridLocale: DataGridEnUs,
  },
  {
    label: 'Spanish',
    value: 'es',
    systemValue: SystemEsEs,
    icon: '/assets/icons/flags/ic_flag_es.svg',
    yupLocale: YupLocales.es,
    datagridLocale: DataGridEsEs,
  },
];

export const defaultLang = allLangs[0]; // English
