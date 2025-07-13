import { ANSWER_API } from '@/constants/api'
import http from '@/services/http'

class AnswerService {
    async getAll(params?: any): Promise<any> {
        return await http.get(ANSWER_API.LIST(params))
    }

    async create(payload: any): Promise<any> {
        return await http.post(ANSWER_API.CREATE, payload)
    }

    async getDetail(id: number | string): Promise<any> {
        return await http.get(ANSWER_API.DETAIL(id))
    }

    async update(id: number | string, payload: any): Promise<any> {
        return await http.put(ANSWER_API.UPDATE(id), payload)
    }

    async delete(id: number | string): Promise<any> {
        return await http.delete(ANSWER_API.DELETE(id))
    }

    async getByQuestion(questionId: number | string): Promise<any> {
        return await http.get(ANSWER_API.BY_QUESTION(questionId))
    }
}

export default new AnswerService()
