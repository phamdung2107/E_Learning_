import axios from 'axios'

import { CREDENTIALS } from '@/constants/storage'
import { getLocalStorage, putLocalStorage } from '@/utils/storage'

export const refreshToken = async () => {
    const refreshToken = getLocalStorage(CREDENTIALS.AUTHENTICATION_TOKEN)
    const res = await axios.post(
        // @ts-ignore
        `${import.meta.env.VITE_APP_ROOT_API}/api/refresh`,
        {},
        {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        }
    )
    putLocalStorage(
        CREDENTIALS.AUTHENTICATION_TOKEN,
        res.data.data.access_token
    )
    return res.data.data.access_token
}
