import axios from 'axios';

const apiTravel = axios.create({
    baseURL: import.meta.env.VITE_API_TRAVEL,
    timeout: 10000,
})

const apiSetTravel = axios.create({
    baseURL: import.meta.env.VITE_API_SETTRAVEL,
    timeout: 10000,
})

apiTravel.interceptors.request.use( (config => {
    const token = localStorage.getItem("@token_TravelBroker")
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}))


apiSetTravel.interceptors.request.use( (config => {
    const token = localStorage.getItem("@token_TravelBroker")
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}))

export {apiSetTravel, apiTravel}