import { RESULT_QUIZ_API } from '@/constants/api'
import http from '@/services/http'

class ResultQuizService {
    async getDetail(id: number | string): Promise<any> {
        return await http.get(RESULT_QUIZ_API.LIST(id))
    }

    async create(payload: any): Promise<any> {
        return await http.post(RESULT_QUIZ_API.CREATE, payload)
    }

    async getMyQuiz(id: number | string): Promise<any> {
        return await http.get(RESULT_QUIZ_API.MY_RESULT_QUIZ(id))
    }

    async getMyQuizByLesson(id: number | string): Promise<any> {
        return await http.get(RESULT_QUIZ_API.MY_RESULT_QUIZ_BY_LESSON(id))
    }
}

export default new ResultQuizService()
