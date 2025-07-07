import axios from 'axios'

const http = axios.create({
    withCredentials: false,
    baseURL: `http://${window.location.hostname}:8000/api`,
    transformRequest: [
        function (data: any, headers: any) {
            return JSON.stringify(data)
        },
    ],
    headers: {
        'Content-Type': 'application/json',
    },
})

http.interceptors.request.use(
    (config: any) => {
        return config
    },
    (error: any) => {
        return Promise.reject(error)
    }
)

http.interceptors.response.use(
    (config: any) => {
        return config?.data
    },
    (error: any) => {
        if ([401, 403].includes(error?.response?.status)) {
            // logout().then((r) => {console.log(r)})
        }
        return Promise.reject(error)
    }
)

export default http
