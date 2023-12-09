// External imports
import { FormikErrors } from 'formik';

// Internal imports
import { SelectItem } from '../UI/MultiSelect/MultiSelect';

export interface FormStepProps<T extends Record<string, any>> {
  isExpended: boolean;
  isStepValid: boolean;
  isSubmitting: boolean;
  numOfSteps: number;
  stepIndex: number;
  values?: T;
  errors?: FormikErrors<T>;
  setFieldValue?: (
    field: string,
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<T>>;
  handleExpended?: (id: number) => void;
}

export interface FormValues {
  name: string;
  email: string;
  hobbies: SelectItem[];
}

export enum EFormStep {
  InfoStep,
  HobbiesStep
}
