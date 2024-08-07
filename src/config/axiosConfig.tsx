import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://opentdb.com',
    headers: {
        'Content-Type': 'application/json',
    },
})

axiosInstance.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axiosInstance
