import { PAYMENT_API } from '@/constants/api'
import http from '@/services/http'

class PaymentService {
    async getAll(): Promise<any> {
        return await http.get(PAYMENT_API.LIST)
    }

    async approve(id: any): Promise<any> {
        return await http.post(PAYMENT_API.APPROVE(id))
    }

    async reject(id: any): Promise<any> {
        return await http.post(PAYMENT_API.REJECT(id))
    }

    async withdraw(payload: any): Promise<any> {
        return await http.post(PAYMENT_API.WITHDRAW, payload)
    }

    async getMyPayment(): Promise<any> {
        return await http.get(PAYMENT_API.MY_PAYMENT)
    }

    async process(): Promise<any> {
        return await http.get(PAYMENT_API.PROCESS_PAYMENT)
    }

    async create(payload: any): Promise<any> {
        return await http.post(PAYMENT_API.CREATE_PAYMENT, payload)
    }
}

export default new PaymentService()
