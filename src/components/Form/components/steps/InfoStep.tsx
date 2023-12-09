// External imports
import { FC } from 'react';
import { Accordion as MuiAccordion, AccordionDetails } from '@mui/material';

// Internal imports
import { AccordionStepActions } from '../accordion/AccordionStepActions';
import { AccordionStepSummary } from '../accordion/AccordionStepSummary';
import Input from '../../../UI/Input/Input';
import { FieldsContainer, accordionStyle } from '../../styles';
import { FormStepProps, FormValues } from '../../types';

export const InfoStep: FC<FormStepProps<FormValues>> = ({
  isExpended,
  isStepValid,
  isSubmitting,
  numOfSteps,
  stepIndex,
  values
}) => {
  return (
    <MuiAccordion data-id={`step-${stepIndex + 1}`} expanded={isExpended} sx={accordionStyle}>
      <AccordionStepSummary stepIndex={stepIndex} title="Info step" summary="Enter your info" />
      <AccordionDetails sx={{ padding: '0 16px 16px' }}>
        <FieldsContainer>
          <Input
            required
            enableFormik
            id="name"
            name="name"
            placeholder="enter your name"
            label="Name"
          />
          <Input
            required
            enableFormik
            id="email"
            name="email"
            placeholder="enter your email"
            label="Email"
          />
        </FieldsContainer>

        <AccordionStepActions
          stepIndex={stepIndex}
          numOfSteps={numOfSteps}
          isStepValid={isStepValid}
          isSubmitting={isSubmitting}
        />
      </AccordionDetails>
    </MuiAccordion>
  );
};
