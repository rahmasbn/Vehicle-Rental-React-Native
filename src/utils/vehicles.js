import axios from 'axios';

const getPopular = axios.get(
  process.env.HOST + '/vehicles/popular?order=desc&page=1&limit=4',
);

const getCar = axios.get(
  process.env.HOST + '/vehicles?page=1&limit=4&type=car',
);

const getMotorbike = axios.get(
  process.env.HOST + '/vehicles?page=1&limit=4&type=motorbike',
);

const getBike = axios.get(
  process.env.HOST + '/vehicles?page=1&limit=4&type=bike',
);

export const vehicleType = () => {
  return axios.all([getPopular, getCar, getMotorbike, getBike]);
};

export const getVehicleByType = (currentPage, type) => {
  const URL = `${process.env.HOST}/vehicles/${type}?page=${currentPage}&limit=8`;
  return axios.get(URL);
};

export const getPopularVehicle = (currentPage, sort) => {
  const URL = `${process.env.HOST}/vehicles/popular?order=${sort}&page=${currentPage}&limit=8`;
  return axios.get(URL);
};

export const getDetailVehicle = id => {
  const URL = `${process.env.HOST}/vehicles/detail/${id}`;
  return axios.get(URL);
};

export const getAllVehicles = search => {
  if (!search) {
    return {};
  }
  const URL = `${process.env.HOST}/vehicles?page=1&limit=8&keyword=${search}`;
  console.log('url', URL);
  return axios.get(URL);
};

export const deleteVehicle = (id, token) => {
  const URL = `${process.env.HOST}/vehicles/${id}`;
  return axios.delete(URL, {
    headers: {
      'x-access-token': token,
    },
  });
};
