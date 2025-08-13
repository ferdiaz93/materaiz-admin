import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { DialogHeaderProps } from './types';
import Iconify from '../iconify';

const DialogHeader: React.FC<DialogHeaderProps> = ({ label, onClose }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {typeof label === 'string' ? <Typography variant="h6">{label}</Typography> : label}
      <IconButton
        onClick={onClose}
        sx={{
          minWidth: 0,
          px: 1,
          color:
            theme.palette.mode === 'dark'
              ? theme.palette.primary.contrastText
              : theme.palette.primary.darker,
        }}
      >
        <Iconify icon="material-symbols:close" />
      </IconButton>
    </Box>
  );
};

export default DialogHeader;
