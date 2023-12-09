// External imports
import { CSSProperties, FC, ReactNode } from 'react';
import { Box, ClickAwayListener } from '@mui/material';

// Internal imports
import { DropdownContainer, dropdownChildrenStyle } from './styles';

interface DropdownProps {
  isOpen?: boolean;
  onClose?: () => void;
  children: ReactNode;
  style?: CSSProperties;
}
const Dropdown: FC<DropdownProps> = ({ isOpen, onClose, children, style }) => {
  return (
    isOpen && (
      <ClickAwayListener onClickAway={onClose}>
        <DropdownContainer data-testid="dropdown" style={style}>
          <Box sx={dropdownChildrenStyle}>
            {children}
          </Box>
        </DropdownContainer>
      </ClickAwayListener>
    )
  );
};

export default Dropdown;
