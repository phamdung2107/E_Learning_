import { ORDER_API } from '@/constants/api'
import http from '@/services/http'

class OrderService {
    async getMyOrders(): Promise<any> {
        return await http.get(ORDER_API.MY_ORDERS)
    }

    async create(payload: any): Promise<any> {
        return await http.post(ORDER_API.CREATE, payload)
    }

    async getDetail(id: number | string): Promise<any> {
        return await http.get(ORDER_API.DETAIL(id))
    }

    async delete(id: number | string): Promise<any> {
        return await http.delete(ORDER_API.DELETE(id))
    }

    async confirm(orderId: number | string): Promise<any> {
        return await http.put(ORDER_API.CONFIRM_ORDER(orderId))
    }

    async cancel(orderId: number | string): Promise<any> {
        return await http.put(ORDER_API.CANCEL_ORDER(orderId))
    }
}

export default new OrderService()
