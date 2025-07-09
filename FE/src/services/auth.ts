import { AxiosResponse } from 'axios'

import { AUTH_API } from '@/constants/api'
import {
    LoginDto,
    LoginResult,
    LogoutDto,
    LogoutResult,
} from '@/interfaces/auth/auth.interface'
import http from '@/services/http'

export class AuthService {
    async login(payload: LoginDto): Promise<AxiosResponse<LoginResult>> {
        return await http.post(AUTH_API.LOGIN, payload)
    }

    async logout(payload: LogoutDto): Promise<AxiosResponse<LogoutResult>> {
        return await http.post(AUTH_API.LOGOUT, payload)
    }
}

export default new AuthService()
