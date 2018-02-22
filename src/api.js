import axios from 'axios';

axios.defaults.headers.post['Accept'] = '*/*';

const instance = axios.create({
  baseURL: 'http://lorem-ipsum.online/',
});

const jsonInstance = axios.create({
  baseURL: 'http://lorem-ipsum.online/',
  headers: {'Content-Type': 'application/json'}
});

export const setTokenApi = access_token => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
};

export const clearTokenApi = () => {
  instance.defaults.headers.common['Authorization'] = undefined;
};

export const login = ({email, password}) =>
  jsonInstance.post('/user_token', {auth: {email, password}}).then(response => {
    if (response.data.result === 'error') return Promise.reject(response);
    return response;
  });

export const registration = ({email, password}) =>
  instance.post('/users', `email=${email}&password=${password}`).then(response => {
    if (response.data.result === 'error') return Promise.reject(response);
    return response;
  });
