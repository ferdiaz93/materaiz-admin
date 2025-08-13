// @mui
import { DialogProps } from '@mui/material';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

export interface ConfirmDialogProps extends Omit<DialogProps, 'title' | 'content'> {
  title: React.ReactNode;
  content?: React.ReactNode;
  action: React.ReactNode;
  open: boolean;
  onCancel: VoidFunction;
  cancelLabel?: ReactNode;
}
