// External imports
import { SxProps, createTheme, Theme } from '@mui/material';

export const COLORS = {
  PRIMARY: '#707070',
  PRIMARY_BLACK: '#000000',
  WHITE: '#FFFFFF',
  BLUE: 'blue',
  ERROR: '#D44B58',
  NEUTRAL_200: '#ECECEC',
  NEUTRAL_300: '#E0E0E0',
  NEUTRAL_400: '#CACACA',
  NEUTRAL_500: '#9D9D9D',
  NEUTRAL_800: '#5A5A5A',
  NEUTRAL_900: '#434343'
};

export const BORDER_RADIUS = 8;

export const helperTextStyles = {
  color: 'error.main',
  marginLeft: '8px',
  position: 'absolute'
};

export const globalTheme: Theme = createTheme({
  palette: {
    primary: {
      main: COLORS.PRIMARY_BLACK
    },
    error: {
      main: COLORS.ERROR
    }
  }
});

export const buttonStyle: SxProps = {
  textTransform: 'none',
  whiteSpace: 'nowrap',
  borderRadius: `${BORDER_RADIUS}px`,
  '&.Mui-disabled': {
    pointerEvents: 'unset',
    cursor: 'not-allowed'
  },
  backgroundColor: COLORS.PRIMARY,
  boxShadow: 'none',
  '&:hover:not(.Mui-disabled)': {
    backgroundColor: COLORS.NEUTRAL_900,
    color: COLORS.NEUTRAL_200
  },
  '&&.Mui-disabled:not(.MuiLoadingButton-loading)': {
    backgroundColor: COLORS.NEUTRAL_300,
    border: `1px solid transparent`,
    color: COLORS.WHITE
  },
  '&&.MuiLoadingButton-loading': {
    backgroundColor: COLORS.NEUTRAL_900,
    border: `1px solid transparent`
  }
};
