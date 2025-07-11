import { QUIZ_API } from '@/constants/api'
import http from '@/services/http'

class QuizService {
    async getAll(params?: any): Promise<any> {
        return await http.get(QUIZ_API.LIST(params))
    }

    async create(payload: any): Promise<any> {
        return await http.post(QUIZ_API.CREATE, payload)
    }

    async getDetail(id: number | string): Promise<any> {
        return await http.get(QUIZ_API.DETAIL(id))
    }

    async update(id: number | string, payload: any): Promise<any> {
        return await http.put(QUIZ_API.UPDATE(id), payload)
    }

    async delete(id: number | string): Promise<any> {
        return await http.delete(QUIZ_API.DELETE(id))
    }

    async getByLesson(lessonId: number | string): Promise<any> {
        return await http.get(QUIZ_API.BY_LESSON(lessonId))
    }
}

export default new QuizService()
