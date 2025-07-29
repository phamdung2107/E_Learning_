import { AUTH_API } from '@/constants/api'
import http from '@/services/http'

class AuthService {
    async login(payload: any): Promise<any> {
        return await http.post(AUTH_API.LOGIN, payload)
    }

    async register(payload: any): Promise<any> {
        return await http.post(AUTH_API.REGISTER, payload)
    }

    async logout(payload: any): Promise<any> {
        return await http.get(AUTH_API.LOGOUT, payload)
    }

    async getCurrentUser(): Promise<any> {
        return await http.get(AUTH_API.ME)
    }

    async refreshToken(): Promise<any> {
        return await http.get(AUTH_API.REFRESH)
    }

    async forgotPassword(payload: any): Promise<any> {
        return await http.post(AUTH_API.FORGOT_PASSWORD, payload)
    }

    async updatePassword(payload: any): Promise<any> {
        return await http.post(AUTH_API.UPDATE_PASSWORD, payload)
    }

    async verifyEmail(payload: any): Promise<any> {
        return await http.post(AUTH_API.VERIFY, payload)
    }
}

export default new AuthService()
