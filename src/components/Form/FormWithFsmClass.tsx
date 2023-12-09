// External imports
import { FC, useCallback, useState } from 'react';
import { Formik, Form as FormikForm, FormikHelpers, FormikState } from 'formik';

// Internal imports
import { initialValues, stepComponents, validationSchema } from './consts';
import { EFormStep, FormValues } from './types';
import { User } from '../../pages/MainPage/MainPage.api';
import { NotificationPopup } from '../UI/NotificationPopup/NotificationPopup';
import { PopupContent } from './components/PopupContent/PopupContent';
import { FormContainer } from './styles';

// FSM related Internal imports
import FormStateMachine from './formFsmMachine';

export const FormWithFsmClass: FC = () => {
  const [activeStep, setActiveStep] = useState(EFormStep.InfoStep);
  const [openPopup, setOpenPopup] = useState(false);

  const handleSubmitInfoStep = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    FormStateMachine.transition('Proceed');
    const currentState = FormStateMachine.getCurrentState();

    if (currentState === 'Error') {
      // do what you would like with the errors.
      // for now it just console.log
      console.log(FormStateMachine.getErrors());
    }

    if (currentState === 'HobbiesStep') {
      setActiveStep(EFormStep.HobbiesStep);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
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
      await FormStateMachine.transition('Proceed', user);
      const currentState = FormStateMachine.getCurrentState();
      if (currentState === 'Error') {
        console.log(FormStateMachine.getErrors());
      }
      if (currentState === 'SubmitStep') {
        setOpenPopup(true);
      }
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
    [activeStep]
  );

  const handleExpended = (step: number) => {
    setActiveStep((prevStep) => {
      if (prevStep === step) {
        return step === 0 ? 1 : 0;
      }
      return step;
    });
  };

  const onClosePopup = (resetForm: (nextState?: Partial<FormikState<FormValues>>) => void) => {
    FormStateMachine.transition('Proceed');
    const currentState = FormStateMachine.getCurrentState();
    if (currentState === 'FinishFlowStep') {
      resetForm({});
      setActiveStep(EFormStep.InfoStep);
      setOpenPopup(false);
    }
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
                    isStepValid={
                      // !Object.keys(errors).length && !hasEmptyValues(extractStepValues(values, idx))
                      true
                    }
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
