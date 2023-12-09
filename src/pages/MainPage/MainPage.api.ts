// External imports
import axios from 'axios';

const TEST_URL = 'http://localhost:3001';
const BASE_URL = 'https://userdetails.free.beeceptor.com';

export interface User {
  name: string;
  email: string;
  hobbies: string[];
}

export const createUser = (user: User, isTest = false) => {
  return axios.post<User>(`${isTest ? TEST_URL : BASE_URL}/user`, user);
};
