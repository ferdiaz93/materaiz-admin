import { Divider, IconButton, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Iconify from 'src/components/iconify';

export default function AuthWithSocial() {
  const { t } = useTranslation();
  return (
    <div>
      <Divider
        sx={{
          my: 2.5,
          typography: 'overline',
          color: 'text.disabled',
          '&::before, ::after': {
            borderTopStyle: 'dashed',
          },
        }}
      >
        {t('or')}
      </Divider>

      <Stack direction="row" justifyContent="center" spacing={2}>
        <IconButton>
          <Iconify icon="eva:google-fill" color="#DF3E30" />
        </IconButton>

        <IconButton color="inherit">
          <Iconify icon="eva:github-fill" />
        </IconButton>

        <IconButton>
          <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
        </IconButton>
      </Stack>
    </div>
  );
}
