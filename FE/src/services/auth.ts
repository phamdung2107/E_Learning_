import { AUTH_API } from '@/constants/api'
import http from '@/services/http'

export class AuthService {
    async login(payload: any): Promise<any> {
        return await http.post(AUTH_API.LOGIN, payload)
    }

    async register(payload: any): Promise<any> {
        return await http.post(AUTH_API.REGISTER, payload)
    }

    async logout(payload: any): Promise<any> {
        return await http.post(AUTH_API.LOGOUT, payload)
    }

    async getCurrentUser(): Promise<any> {
        return await http.get(AUTH_API.ME)
    }
}

export default new AuthService()
