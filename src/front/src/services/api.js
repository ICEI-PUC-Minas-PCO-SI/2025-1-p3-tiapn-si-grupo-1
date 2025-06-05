import axios from 'axios';

const api = axios.create({
    baseURL: 'https://layerg-knowflow.pxipv3.easypanel.host/api',
});

export default api;
