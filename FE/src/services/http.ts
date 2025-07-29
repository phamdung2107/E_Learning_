import axios, { AxiosRequestConfig } from 'axios'

import { CREDENTIALS } from '@/constants/storage'
import { PATHS } from '@/routers/path'
import {
    getLocalStorage,
    putLocalStorage,
    removeLocalStorage,
} from '@/utils/storage'
import { refreshToken } from '@/utils/token'

const http = axios.create({
    withCredentials: false,
    // @ts-ignore
    baseURL: import.meta.env.VITE_APP_ROOT_API,
    headers: {
        'Content-Type': 'application/json',
    },
})

http.interceptors.request.use(
    (config) => {
        const accessToken = getLocalStorage(CREDENTIALS.AUTHENTICATION_TOKEN)
        if (accessToken && config.headers) {
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error)
        } else {
            prom.resolve(token)
        }
    })
    failedQueue = []
}

http.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        const originalRequest: any = error.config

        if (
            (error.response?.status === 401 ||
                error.response?.status === 403) &&
            !originalRequest._retry
        ) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject })
                })
                    .then((token) => {
                        originalRequest.headers['Authorization'] =
                            'Bearer ' + token
                        return http(originalRequest)
                    })
                    .catch((err) => {
                        return Promise.reject(err)
                    })
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                const newToken = await refreshToken()
                putLocalStorage(CREDENTIALS.AUTHENTICATION_TOKEN, newToken)
                http.defaults.headers.common['Authorization'] =
                    'Bearer ' + newToken
                processQueue(null, newToken)
                originalRequest.headers['Authorization'] = 'Bearer ' + newToken
                return http(originalRequest)
            } catch (err) {
                processQueue(err, null)
                removeLocalStorage(CREDENTIALS.AUTHENTICATION_TOKEN)
                window.location.href = PATHS.AUTH
                return Promise.reject(err)
            } finally {
                isRefreshing = false
            }
        }

        return Promise.reject(error)
    }
)

export default http
