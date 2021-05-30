import axios from 'axios';

const baseUrl = 'http://localhost:3000'; // Change back to original heroku URL before committing. If you see this line on the main repo, we're in trouble.
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
