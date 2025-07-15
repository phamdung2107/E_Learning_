import { NOTIFICATION_API } from '@/constants/api'
import http from '@/services/http'

class NotificationService {
    async getAll(): Promise<any> {
        return await http.get(NOTIFICATION_API.LIST)
    }

    async getAllUnread(): Promise<any> {
        return await http.get(NOTIFICATION_API.LIST_UNREAD)
    }

    async maskAsRead(id: number | string): Promise<any> {
        return await http.put(NOTIFICATION_API.MARK_AS_READ(id))
    }

    async delete(id: number | string): Promise<any> {
        return await http.delete(NOTIFICATION_API.DELETE(id))
    }

    async getDetail(id: number | string): Promise<any> {
        return await http.get(NOTIFICATION_API.DETAIL(id))
    }
}

export default new NotificationService()
