import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const CloseDiscardConfirmation = ({ open, onClose: close }) => {

  const onCancel = () => close(false);
  const onOk = () => close(true);

  return (
    <Dialog open={open} onClose={onCancel} aria-labelledby="form-dialog-title">
      <DialogTitle>Dicard Changes</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>You have pending changes. Are you sure you want to discard them and close ?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">No</Button>
        <Button onClick={onOk} color="primary">Yes</Button>
      </DialogActions>
    </Dialog>
  );
}
