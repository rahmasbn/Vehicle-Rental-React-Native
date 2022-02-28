import {login} from '../../utils/auth';

export const loginAction = body => {
  return {
    type: 'AUTH_LOGIN',
    payload: login(body),
  };
};

export const logoutAction = () => {
  return {
    type: 'AUTH_LOGOUT',
  };
};

export const updateUserPhoto = image => {
  return {
    type: 'USER_PHOTO',
    payload: image,
  };
};
