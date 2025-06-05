import axios from 'axios';

const api = axios.create({
    baseURL: 'https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api',
});

export default api;
