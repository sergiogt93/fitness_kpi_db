import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export const setCsrfToken = async () => {
  try {
    await axios.get('/sanctum/csrf-cookie');
  } catch (error) {
    console.error('Error fetching CSRF token', error);
  }
};

export default axios;