import { AxiosResponse } from 'axios'

import { USER_API } from '@/constants/api'
import http from '@/services/http'

class UserService {
    async getAll(params?: any): Promise<AxiosResponse<any>> {
        return await http.get(USER_API.GET_ALL, { params })
    }

    async getById(id: number | string): Promise<AxiosResponse<any>> {
        return await http.get(USER_API.GET_BY_ID(id))
    }

    async create(data: any): Promise<AxiosResponse<any>> {
        return await http.post(USER_API.CREATE, data)
    }

    async update(id: number | string, data: any): Promise<AxiosResponse<any>> {
        return await http.put(USER_API.UPDATE(id), data)
    }

    async delete(id: number | string): Promise<AxiosResponse<any>> {
        return await http.delete(USER_API.DELETE(id))
    }

    async changePassword(data: any): Promise<AxiosResponse<any>> {
        return await http.post(USER_API.CHANGE_PASSWORD, data)
    }

    async resetUser(userId: number | string): Promise<AxiosResponse<any>> {
        return await http.post(USER_API.RESET_USER(userId))
    }

    async changeRole(
        userId: number | string,
        payload: any
    ): Promise<AxiosResponse<any>> {
        return await http.post(USER_API.UPDATE_ROLE(userId), payload)
    }

    async changeStatus(
        userId: number | string,
        payload: any
    ): Promise<AxiosResponse<any>> {
        return await http.post(USER_API.UPDATE_STATUS(userId), payload)
    }

    async countUsers(): Promise<AxiosResponse<any>> {
        return await http.get(USER_API.COUNT_USERS)
    }
}

export default new UserService()
