import { Dialog, DialogContent, DialogTitle, DialogContentProps } from '@mui/material';
import React from 'react';
import DialogHeader from './DialogHeader';

interface TemplateDialogProps {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  content: React.ReactNode;
  contentProps?: DialogContentProps;
}

/**
 * Mui Dialog wrapper.
 * @param open Boolean to control the visibility of the dialog.
 * @param onClose Function to handle the closing of the dialog.
 * @param title String to set the title of the dialog.
 * @param content React node to be displayed as the content of the dialog.
 * @param contentProps Optional props to be passed to the DialogContent component.
 * @example
 * <TemplateDialog
 *     open={isOpen}
 *     onClose={handleClose}
 *     title="Dialog Title"
 *     content={<div>Your content here</div>}
 *     contentProps={{ sx: {padding: 5} }}
 * />
 */

const TemplateDialog: React.FC<TemplateDialogProps> = ({
  open,
  onClose,
  title,
  content,
  contentProps,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <DialogHeader label={title} onClose={onClose} />
      </DialogTitle>
      <DialogContent {...contentProps}>{content}</DialogContent>
    </Dialog>
  );
};

export default TemplateDialog;
