// External imports
import { FC } from 'react';
import { Accordion as MuiAccordion, AccordionDetails } from '@mui/material';

// Internal imports
import { AccordionStepSummary } from '../accordion/AccordionStepSummary';
import { AccordionStepActions } from '../accordion/AccordionStepActions';
import MultiSelect, { SelectItem } from '../../../UI/MultiSelect/MultiSelect';
import { FieldsContainer, accordionStyle } from '../../styles';
import { FormStepProps, FormValues } from '../../types';

const options = [
  { value: 'golf', name: 'Golf' },
  { value: 'weight_lifting', name: 'Weight Lifting' },
  { value: 'fishing', name: 'Fishing' },
  { value: 'netflix', name: 'Watch Netflix' }
];

export const HobbiesStep: FC<FormStepProps<FormValues>> = ({
  isExpended,
  isStepValid,
  isSubmitting,
  numOfSteps,
  stepIndex,
  values,
  setFieldValue,
  handleExpended
}) => {
  const onSetSelectValues = (values: SelectItem[], field: string) => {
    setFieldValue(field, values);
  };

  return (
    <MuiAccordion data-id={`step-${stepIndex + 1}`} expanded={isExpended} sx={accordionStyle}>
      <AccordionStepSummary
        stepIndex={stepIndex}
        title="Hobbies step"
        summary="Tell us about your hobbies (if you want to)"
        handleExpended={handleExpended}
      />
      <AccordionDetails sx={{ padding: '0 16px 16px' }}>
        <FieldsContainer>
          <MultiSelect
            options={options}
            name="hobbies"
            value={values.hobbies}
            enableFormik={true}
            onChange={onSetSelectValues}
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
