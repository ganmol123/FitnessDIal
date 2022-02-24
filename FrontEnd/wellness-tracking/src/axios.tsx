import axios from 'axios';
const instance = axios.create({baseURL: 'https://localhost:4000'});
instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';

export default instance