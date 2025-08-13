import { Paper, PaperProps, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

interface Props extends PaperProps {
  query?: string;
}

export default function SearchNotFound({ query, sx, ...other }: Props) {
  const { t } = useTranslation();

  return query ? (
    <Paper
      sx={{
        textAlign: 'center',
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h6" paragraph>
        {t('field.not_found')}
      </Typography>

      <Typography variant="body2">
        {t('field.no_results_found')} &nbsp;
        <strong>&quot;{query}&quot;</strong>.
        <br /> {t('field.try_typos')}
      </Typography>
    </Paper>
  ) : (
    <Typography variant="body2" sx={sx}>
      {t('field.please_enter_keywords')}
    </Typography>
  );
}
