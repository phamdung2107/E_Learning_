import axios from 'axios'

import { CREDENTIALS } from '@/constants/storage'
import { getLocalStorage } from '@/utils/storage'

const http = axios.create({
    withCredentials: false,
    // @ts-ignore
    baseURL: import.meta.env.VITE_APP_ROOT_API,
    transformRequest: [
        function (data: any, headers: any) {
            const accessToken = getLocalStorage(
                CREDENTIALS.AUTHENTICATION_TOKEN
            )
            headers['Authorization'] = `Bearer ${accessToken}`
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
