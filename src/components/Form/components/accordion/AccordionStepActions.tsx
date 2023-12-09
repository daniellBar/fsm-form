// External imports
import { FC } from 'react';
import { AccordionActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Internal imports
import Typography from '../../../UI/Typography/Typography';
import { COLORS, buttonStyle } from '../../../../globalStyles';


interface AccordionStepActionsProps {
  stepIndex: number;
  numOfSteps: number;
  isStepValid: boolean;
  isSubmitting: boolean;
}

export const AccordionStepActions: FC<AccordionStepActionsProps> = ({
  stepIndex,
  numOfSteps,
  isStepValid,
  isSubmitting
}) => {
  return (
    <AccordionActions sx={{ position: 'absolute', bottom: '20px', right: '20px' }}>
      <Typography
        color={COLORS.NEUTRAL_500}
        weight="semibold"
        type="caption"
        style={{ marginRight: '15px' }}>
        {`Part ${Number(stepIndex) + 1} of ${numOfSteps}`}
      </Typography>

      <LoadingButton
        sx={buttonStyle}
        type="submit"
        disabled={!isStepValid || isSubmitting}
        loading={isSubmitting}>
        {`${Number(stepIndex) + 1 === numOfSteps ? 'Finish' : 'Proceed'}`}
      </LoadingButton>
    </AccordionActions>
  );
};
