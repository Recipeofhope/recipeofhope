export const USER_KEY = 'user';
export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';

export const USER_TYPES = {
  COOK: 'Cook',
  PATIENT: 'Patient',
  ADMIN: 'Admin',
};

export const ROUTES = {
  HOME: '/',
  COOK: '/cook',
  ABOUT: '/about',
  RECIPIENT: '/recipient',
  ADMIN: '/admin'
};



export const PROTECTED_ROUTES = [
  ROUTES.COOK, ROUTES.RECIPIENT, ROUTES.ADMIN
];

export const USER_TYPE_ROUTE_MAP = {
  [USER_TYPES.COOK]: ROUTES.COOK, 
  [USER_TYPES.PATIENT]: ROUTES.RECIPIENT,
  [USER_TYPES.ADMIN]: ROUTES.ADMIN 
}