import _isEmpty from 'lodash/isEmpty';
import { USER_KEY } from '../constants/app.constants';

export const isAuthenticated = () => !_isEmpty(localStorage.getItem(USER_KEY));

export const getStoredUser = () => JSON.parse(localStorage.getItem(USER_KEY));
