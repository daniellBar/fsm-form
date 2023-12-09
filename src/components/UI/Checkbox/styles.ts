// External imports
import { SxProps } from '@mui/material';

// Internal imports
import { COLORS } from '../../../globalStyles';

export const checkBoxStyles = {
  color: COLORS.PRIMARY_BLACK,
  backgroundColor: 'transparent',
  '&.Mui-checked': {
    color: COLORS.PRIMARY
  },
  '&.MuiCheckbox-indeterminate ': {
    color: COLORS.PRIMARY
  },
  '&:hover': {
    color: COLORS.NEUTRAL_900,
    backgroundColor: 'transparent'
  },
  '&:disabled': {
    color: COLORS.NEUTRAL_500,
    backgroundColor: COLORS.NEUTRAL_200,
    '&.Mui-checked': {
      color: COLORS.PRIMARY_BLACK
    }
  }
};

export const labelStyle: SxProps = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: '80%'
};
