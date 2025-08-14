import { CERTIFICATE_API } from '@/constants/api'
import http from '@/services/http'

class CertificateService {
    async getAll(params?: any): Promise<any> {
        return await http.get(CERTIFICATE_API.LIST(params))
    }

    async create(payload: any): Promise<any> {
        return await http.post(CERTIFICATE_API.CREATE, payload)
    }

    async getDetail(id: number | string): Promise<any> {
        return await http.get(CERTIFICATE_API.DETAIL(id))
    }

    async delete(id: number | string): Promise<any> {
        return await http.delete(CERTIFICATE_API.DELETE(id))
    }

    async check(
        userId: number | string,
        courseId: number | string
    ): Promise<any> {
        return await http.get(
            CERTIFICATE_API.CHECK_CERTIFICATE(userId, courseId)
        )
    }
}

export default new CertificateService()
