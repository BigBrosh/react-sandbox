import axios from 'axios';

const BaseURL = 'http://localhost:4000';

const request = (method, url) => (params) =>
  axios[method](`${BaseURL}${url}`, params);

export const shop = {
  listItems: request('get', '/shop/')
};