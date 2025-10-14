import { Dialog, DialogTitle, DialogContent, IconButton, Box } from '@mui/material';
import { PropsWithChildren } from 'react';
import Iconify from '../iconify';

interface CustomModalProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
  title: string;
  isLoading?: boolean;
}

const CustomModal = ({ open, onClose, title, children, isLoading }: CustomModalProps) => (
  <Dialog open={open} onClose={onClose} fullWidth>
    <Box sx={{ pointerEvents: isLoading ? 'none' : 'auto', opacity: isLoading ? 0.5 : 1 }}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {title}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <Iconify icon="ic:baseline-close" width={24} color={'grey.500'} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pb: 2 }}>{children}</DialogContent>
    </Box>
  </Dialog>
);

export default CustomModal;
