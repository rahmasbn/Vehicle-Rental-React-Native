import axios from 'axios';

export const getProfile = token => {
  const URL = process.env.HOST + '/users/profile';
  return axios.get(URL, {
    headers: {
      'x-access-token': token,
    },
  });
};

export const editPassword = (token, body) => {
  const URL = process.env.HOST + '/users/edit-password';
  return axios.patch(URL, body, {
    headers: {
      'x-access-token': token,
    },
  });
};

export const editUser = (body, token) => {
  const URL = process.env.HOST + '/users/profile';
  return axios({
    method: 'PATCH',
    url: URL,
    data: body,
    headers: {
      // Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      'x-access-token': token,
    },
  });
};
