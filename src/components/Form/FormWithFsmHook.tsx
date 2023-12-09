// External imports
import { FC, useCallback, useEffect, useState } from 'react';
import { Formik, FormikErrors, Form as FormikForm, FormikHelpers, FormikState } from 'formik';

// Internal imports
import { FormContainer } from './styles';
import { initialValues, stepComponents, validationSchema } from './consts';
import { EFormStep, FormValues } from './types';
import { User } from '../../pages/MainPage/MainPage.api';
import { NotificationPopup } from '../UI/NotificationPopup/NotificationPopup';
import { PopupContent } from './components/PopupContent/PopupContent';

// FSM related Internal imports
import { EventOption, StateOption, definition } from './formFsmMachine';
import { useFSM } from '../../fsm/useFsm';
import { hasEmptyValues } from '../../utils';

export const FormWithFsmHook: FC = () => {
  const [activeStep, setActiveStep] = useState(EFormStep.InfoStep);
  const [openPopup, setOpenPopup] = useState(false);

  const { currentState, setCurrentState, errors, transition } = useFSM<
    StateOption,
    EventOption,
    (...args: any[]) => any
  >(definition);

  useEffect(() => {
    if (currentState === 'InfoStep' && activeStep !== EFormStep.InfoStep) {
      // this is a a case when user filled the info step and then proceeded to hobbies step
      // and instead of finishing the form he went back to info step
      setActiveStep(EFormStep.InfoStep);
    }
    if (currentState === 'Error') {
      console.log(errors);
    } else if (currentState === 'HobbiesStep') {
      setActiveStep(EFormStep.HobbiesStep);
    } else if (currentState === 'SubmitStep') {
      setOpenPopup(true);
    } else if (currentState === 'FinishFlowStep') {
      setCurrentState('InfoStep'); // rest the fsm
      setActiveStep(EFormStep.InfoStep); // rest the form step
      setOpenPopup(false);
    }
  }, [currentState, errors]);

  const handleSubmitInfoStep = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    await transition('Proceed');
    actions.setTouched({});
    actions.setSubmitting(false);
  };

  const handleSubmitHobbiesStep = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const { name, email, hobbies } = values;
    const user: User = {
      name,
      email,
      hobbies: hobbies.map(({ value }) => value)
    };
    try {
      await transition('Proceed', user);
    } catch (error) {
      console.log(error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const submitByStep = useCallback(
    (values: FormValues, actions: FormikHelpers<FormValues>) => {
      switch (activeStep) {
        case EFormStep.InfoStep:
          return handleSubmitInfoStep(values, actions);
        case EFormStep.HobbiesStep:
          return handleSubmitHobbiesStep(values, actions);
      }
    },
    // eslint-disable-next-line
    [activeStep]
  );

  const checkStepValidity = (values: FormValues, errors: FormikErrors<FormValues>) => {
    const hasErrors = Object.keys(errors).length;
    const hasEmptyFields = hasEmptyValues(values);
    return !hasErrors && !hasEmptyFields;
  };

  const handleExpended = async (step: EFormStep) => {
    if (currentState === 'HobbiesStep') {
      await transition('Collapse');
    }
  };

  const onClosePopup = async (
    resetForm: (nextState?: Partial<FormikState<FormValues>>) => void
  ) => {
    await transition('Proceed');
    resetForm({}); // reset form values to be empty
  };

  return (
    <>
      <FormContainer data-testid={`form`}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema[activeStep]}
          onSubmit={(values, actions) => {
            submitByStep(values, actions);
          }}>
          {({ isSubmitting, values, errors, setFieldValue, resetForm }) => (
            <FormikForm style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {stepComponents.map(({ component }, idx) => {
                const StepComponent = component;
                return (
                  <StepComponent
                    key={`step-${idx}`}
                    data-testid={`step-${idx}`}
                    stepIndex={idx}
                    numOfSteps={stepComponents.length}
                    isExpended={Number(activeStep) === idx}
                    isSubmitting={isSubmitting}
                    isStepValid={checkStepValidity(values, errors)}
                    errors={errors}
                    values={values}
                    setFieldValue={setFieldValue}
                    handleExpended={handleExpended}
                  />
                );
              })}
              <NotificationPopup
                content={<PopupContent />}
                isOpen={openPopup}
                onClose={() => onClosePopup(resetForm)}
              />
            </FormikForm>
          )}
        </Formik>
      </FormContainer>
    </>
  );
};
