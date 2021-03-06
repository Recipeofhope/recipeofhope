import axios from 'axios';

const baseUrl = process.env.VUE_APP_BASE_URL;
const timeout = 600000;
const headers = {};
const token = localStorage.getItem('token');

const options = { baseURL: baseUrl, timeout, headers };
if (token) {
  options.headers['x-access-token'] = `${token}`;
  // options.headers['content-type'] = `multipart/form-data`
}

const commonAPI = axios.create(options);

export default commonAPI;
