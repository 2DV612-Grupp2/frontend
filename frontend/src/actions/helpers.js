import axios from 'axios';
import config from '../config';

export function apiRequest(method, data, url) {
  return axios({
    method,
    data,
    url: `${config.serverURI}${url}`,
  });
}