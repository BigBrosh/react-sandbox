import axios from 'axios';

const baseURL = 'http://localhost:4000';

const request = (method, url, configs) => (params) =>
  axios[method](`${baseURL}${url}`, params, configs);

export const shop = {
  fetchItems: request('get', '/shop')
};