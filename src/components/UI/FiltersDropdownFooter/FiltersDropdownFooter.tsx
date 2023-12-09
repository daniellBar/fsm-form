// External imports
import { FC } from 'react';
import { Button } from '@mui/material';

// Internal imports
import { FooterStyle } from './styles';


interface FiltersDropdownFooterProps {
  canClear: boolean;
  canSubmit: boolean;
  onSaveSelection: () => void;
  onClearSelection: (e: React.SyntheticEvent) => void;
}

const FiltersDropdownFooter: FC<FiltersDropdownFooterProps> = ({
  canClear,
  canSubmit,
  onSaveSelection,
  onClearSelection
}) => {
  return (
    <FooterStyle>
      <Button onClick={onClearSelection} data-testid="clear" disabled={!canClear}>
        clear
      </Button>
      <Button onClick={onSaveSelection} data-testid="submit" disabled={!canSubmit}>
        Apply
      </Button>
    </FooterStyle>
  );
};

export default FiltersDropdownFooter;
