import { COURSE_API } from '@/constants/api'
import http from '@/services/http'
import httpFile from '@/services/httpFile'

class CourseService {
    async getAll(params: any): Promise<any> {
        return await http.get(COURSE_API.LIST(params))
    }

    async create(payload: any): Promise<any> {
        return await httpFile.post(COURSE_API.CREATE, payload)
    }

    async getMyEnrolledCourses(params: any): Promise<any> {
        return await http.get(COURSE_API.MY_ENROLLED(params))
    }

    async getDetail(id: number | string): Promise<any> {
        return await http.get(COURSE_API.DETAIL(id))
    }

    async update(id: number | string, payload: any): Promise<any> {
        return await httpFile.post(COURSE_API.UPDATE(id), payload)
    }

    async delete(id: number | string): Promise<any> {
        return await http.delete(COURSE_API.DELETE(id))
    }

    async archive(id: number | string): Promise<any> {
        return await http.post(COURSE_API.ARCHIVE(id))
    }

    async publish(id: number | string): Promise<any> {
        return await http.post(COURSE_API.PUBLISH(id))
    }

    async pending(id: number | string): Promise<any> {
        return await http.post(COURSE_API.PENDING(id))
    }

    async lessonWithQuiz(id: number | string): Promise<any> {
        return await http.get(COURSE_API.LESSON_WITH_QUIZ(id))
    }
}

export default new CourseService()
