// External imports
import { FC } from 'react';
import { DialogActions, DialogContent, Dialog, Button } from '@mui/material';

// Internal imports
import { dialogActionsStyle, dialogContentStyle, DialogHeaderStyle } from './styles';
import { buttonStyle } from '../../../globalStyles';

export interface NotificationPopupProps {
  isOpen: boolean;
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
  content: JSX.Element;
}

export const NotificationPopup: FC<NotificationPopupProps> = ({ isOpen, onClose, content }) => {
  return (
    <Dialog open={isOpen}>
      <DialogHeaderStyle></DialogHeaderStyle>
      <DialogContent id="dialog-content" sx={dialogContentStyle}>
        {content}
      </DialogContent>
      <DialogActions sx={dialogActionsStyle}>
        <Button onClick={onClose} sx={buttonStyle}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};
