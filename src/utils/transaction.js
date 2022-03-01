import axios from 'axios';

export const createTransaction = (body, token) => {
  const URL = process.env.HOST + '/transaction';
  return axios.post(URL, body, {
    headers: {
      'x-access-token': token,
    },
  });
};

export const getDetailTransaction = (token, id) => {
  const URL = `${process.env.HOST}/transaction/${id}`;
  return axios.get(URL, {
    headers: {
      'x-access-token': token,
    },
  });
};

export const getAllTransaction = (currentPage, token) => {
  const URL = `${process.env.HOST}/transaction?page=${currentPage}&limit=8`;
  return axios.get(URL, {
    headers: {
      'x-access-token': token,
    },
  });
};
