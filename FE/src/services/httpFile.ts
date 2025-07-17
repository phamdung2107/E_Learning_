import axios from 'axios'

import { CREDENTIALS } from '@/constants/storage'
import { getLocalStorage } from '@/utils/storage'

const httpFile = axios.create({
    withCredentials: false,
    // @ts-ignore
    baseURL: import.meta.env.VITE_APP_ROOT_API,
})

httpFile.interceptors.request.use(
    (config) => {
        const accessToken = getLocalStorage(CREDENTIALS.AUTHENTICATION_TOKEN)
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config
    },
    (error: any) => {
        return Promise.reject(error)
    }
)

httpFile.interceptors.response.use(
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

export default httpFile
