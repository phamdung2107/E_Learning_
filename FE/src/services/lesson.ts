import { LESSON_API } from '@/constants/api'
import http from '@/services/http'

class LessonService {
    async getAll(params?: any): Promise<any> {
        return await http.get(LESSON_API.LIST(params))
    }

    async create(payload: any): Promise<any> {
        return await http.post(LESSON_API.CREATE, payload)
    }

    async getDetail(id: number | string): Promise<any> {
        return await http.get(LESSON_API.DETAIL(id))
    }

    async update(id: number | string, payload: any): Promise<any> {
        return await http.put(LESSON_API.UPDATE(id), payload)
    }

    async delete(id: number | string): Promise<any> {
        return await http.delete(LESSON_API.DELETE(id))
    }

    async getByCourse(courseId: number | string): Promise<any> {
        return await http.get(LESSON_API.BY_COURSE(courseId))
    }
}

export default new LessonService()
