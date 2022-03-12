import axios from 'axios';

export const login = body => {
  const URL = process.env.HOST + '/auth/login';
  // console.log('url', URL);
  return axios.post(URL, body);
};

export const register = body => {
  const URL = process.env.HOST + '/auth/register';
  return axios.post(URL, body);
};

export const logout = token => {
  const URL = process.env.HOST + '/auth/logout';
  return axios.delete(URL, {
    headers: {
      'x-access-token': token,
    },
  });
};

export const forgotPass = body => {
  const URL = process.env.HOST + '/auth/forgot-password';
  return axios.post(URL, body);
};

export const checkOTP = body => {
  const URL = process.env.HOST + '/auth/check-otp';
  return axios.post(URL, body);
};

export const resetPass = body => {
  const URL = process.env.HOST + '/auth/reset-password';
  return axios.post(URL, body);
};
