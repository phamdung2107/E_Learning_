import { QUESTION_API } from '@/constants/api'
import http from '@/services/http'

class QuestionService {
    async getAll(params?: any): Promise<any> {
        return await http.get(QUESTION_API.LIST(params))
    }

    async create(payload: any): Promise<any> {
        return await http.post(QUESTION_API.CREATE, payload)
    }

    async getDetail(id: number | string): Promise<any> {
        return await http.get(QUESTION_API.DETAIL(id))
    }

    async update(id: number | string, payload: any): Promise<any> {
        return await http.put(QUESTION_API.UPDATE(id), payload)
    }

    async delete(id: number | string): Promise<any> {
        return await http.delete(QUESTION_API.DELETE(id))
    }

    async getByQuiz(quizId: number | string): Promise<any> {
        return await http.get(QUESTION_API.BY_QUIZ(quizId))
    }
}

export default new QuestionService()
