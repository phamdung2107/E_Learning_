import { EVENT_API } from '@/constants/api'
import http from '@/services/http'

class EventService {
    async getAll(params: any): Promise<any> {
        return await http.get(EVENT_API.LIST(params))
    }

    async create(payload: any): Promise<any> {
        return await http.post(EVENT_API.CREATE, payload)
    }

    async getDetail(id: number | string): Promise<any> {
        return await http.get(EVENT_API.DETAIL(id))
    }

    async update(id: number | string, payload: any): Promise<any> {
        return await http.put(EVENT_API.UPDATE(id), payload)
    }

    async delete(id: number | string): Promise<any> {
        return await http.delete(EVENT_API.DELETE(id))
    }

    async toggleStatus(id: number | string): Promise<any> {
        return await http.patch(EVENT_API.TOGGLE(id))
    }
}

export default new EventService()
