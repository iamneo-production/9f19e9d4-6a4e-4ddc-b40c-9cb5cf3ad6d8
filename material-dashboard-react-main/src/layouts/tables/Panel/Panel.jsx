import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import PanelForm from '../PanelForm/PanelForm';

const Panel = ({ open, onClose, selectedItem, selectedUser, onSubmit }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl">
      <DialogTitle>Allocate/Deallocate Item</DialogTitle>
      <DialogContent>
        <PanelForm selectedItem={selectedItem} selectedUser={selectedUser} onSubmit={onSubmit} onClose={onClose} />
      </DialogContent>
      <DialogActions>
        {/* No need for additional buttons here as they are in the FormComponent */}
      </DialogActions>
    </Dialog>
  );
};

export default Panel;
