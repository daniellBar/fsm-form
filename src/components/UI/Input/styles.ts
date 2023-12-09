// External imports
import { SxProps } from '@mui/material/styles';

// Internal imports
import { BORDER_RADIUS, COLORS } from '../../../globalStyles';

export const sxStyles = (): SxProps => {
  const defaultStyles = {
    fontSize: 14,
    width: '585px',
    height: '72px',
    input: {
      padding: 2,
      '&::placeholder': {
        opacity: 1,
        color: `${COLORS.NEUTRAL_800}`
      }
    },
    '& .MuiInputLabel-root:not(.Mui-error)': {
      color: COLORS.NEUTRAL_900
    },
    '& label': {
      '&.Mui-focused:not(.Mui-error)': {
        marginLeft: 0,
        color: `${COLORS.NEUTRAL_800}`
      },
      '&.Mui-focused.Mui-error': {
        marginLeft: 0,
        color: `${COLORS.ERROR} !important`
      }
    },
    '& textarea, input': {
      '&::placeholder': {
        color: `${COLORS.NEUTRAL_500}`,

        opacity: 1
      }
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: `1px solid ${COLORS.NEUTRAL_400}`,
        borderRadius: `${BORDER_RADIUS}px`
      },
      '&:hover:not(.Mui-disabled):not(.Mui-error) fieldset': {
        borderColor: COLORS.NEUTRAL_900,
        color: COLORS.NEUTRAL_900
      },
      '&.Mui-focused:not(.Mui-disabled):not(.Mui-error) fieldset': {
        border: `1px solid ${COLORS.PRIMARY}`,
        background: 'none',
        opacity: 1
      },
      'input:-webkit-autofill': {
        boxShadow: `0 0 0 30px ${COLORS.WHITE} inset !important`,
        fontSize: '14px !important',
        '&:hover': {
          boxShadow: `0 0 0 30px ${COLORS.WHITE} inset !important`,
          fontSize: '14px !important'
        },
        '&:focus': {
          boxShadow: `0 0 0 30px ${COLORS.WHITE} inset !important`,
          fontSize: '14px !important'
        }
      }
    }
  };

  //   const disabledStyles = {
  //     '& .MuiOutlinedInput-root.Mui-disabled': {
  //       '& fieldset': {
  //         color: NEUTRAL_SHADES[500],
  //         border: `1px solid ${NEUTRAL_SHADES[500]}`
  //       }
  //     },
  //     '& .MuiInputLabel-root.Mui-disabled': {
  //       color: `${NEUTRAL_SHADES[600]}`
  //     }
  //   };
  const errorStyles = {
    '& .MuiInputLabel-root': {
      color: `${COLORS.NEUTRAL_900} !important`,
      marginBlock: '-3px'
    },
    '& .MuiInputLabel-shrink': {
      marginBlock: 0
    },
    '& label': {
      '&.Mui-focused': {
        color: `${COLORS.ERROR}`
      }
    },
    '.MuiOutlinedInput-root.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: `1px solid ${COLORS.ERROR}`
    }
  };

  return [defaultStyles, errorStyles];
};
