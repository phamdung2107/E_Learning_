import { REVIEW_API } from '@/constants/api'
import http from '@/services/http'

class ReviewService {
    async getAll(params: any): Promise<any> {
        return await http.get(REVIEW_API.LIST(params))
    }

    async create(payload: any): Promise<any> {
        return await http.post(REVIEW_API.CREATE, payload)
    }

    async getDetail(id: number | string): Promise<any> {
        return await http.get(REVIEW_API.DETAIL(id))
    }

    async update(id: number | string, payload: any): Promise<any> {
        return await http.put(REVIEW_API.UPDATE(id), payload)
    }

    async delete(id: number | string): Promise<any> {
        return await http.delete(REVIEW_API.DELETE(id))
    }

    async getAverageByCourse(courseId: number | string): Promise<any> {
        return await http.get(REVIEW_API.AVERAGE_BY_COURSE(courseId))
    }

    async getByCourse(courseId: number | string): Promise<any> {
        return await http.get(REVIEW_API.BY_COURSE(courseId))
    }

    async getByUser(userId: number | string): Promise<any> {
        return await http.get(REVIEW_API.BY_USER(userId))
    }
}

export default new ReviewService()
