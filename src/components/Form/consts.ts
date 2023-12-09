// External imports
import * as Yup from 'yup';

// Internal imports
import { FormValues } from './types';
import { HobbiesStep } from './components/steps/HobbiesStep';
import { InfoStep } from './components/steps/InfoStep';

export const validationSchema = [
  Yup.object({
    name: Yup.string().required('This field is required'),
    email: Yup.string().email('Invalid email address').required('This field is required')
  })
];

export const initialValues: FormValues = {
  name: '',
  email: '',
  hobbies: []
};

export const stepComponents = [
  {
    component: InfoStep
  },
  {
    component: HobbiesStep
  }
];
