import axios from 'axios';

const apiTravel = axios.create({
    baseURL: import.meta.env.VITE_API_TRAVEL,
    timeout: 10000,
})

const apiSetTravel = axios.create({
    baseURL: import.meta.env.VITE_API_SETTRAVEL,
    timeout: 10000,
})

export {apiSetTravel, apiTravel}