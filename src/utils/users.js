import axios from 'axios';

export const getProfile = token => {
  const URL = process.env.HOST + '/users/profile';
  return axios.get(URL, {
    headers: {
      'x-access-token': token,
    },
  });
};
