import { PROGRESS_API } from '@/constants/api'
import http from '@/services/http'

class ProgressService {
    async getAll(params?: any): Promise<any> {
        return await http.get(PROGRESS_API.LIST(params))
    }

    async create(payload: any): Promise<any> {
        return await http.post(PROGRESS_API.CREATE, payload)
    }

    async getDetail(id: number | string): Promise<any> {
        return await http.get(PROGRESS_API.DETAIL(id))
    }

    async update(id: number | string, payload: any): Promise<any> {
        return await http.put(PROGRESS_API.UPDATE(id), payload)
    }

    async delete(id: number | string): Promise<any> {
        return await http.delete(PROGRESS_API.DELETE(id))
    }

    async completeLesson(payload: any): Promise<any> {
        return await http.post(PROGRESS_API.COMPLETE_LESSON, payload)
    }

    async getByUser(userId: number | string): Promise<any> {
        return await http.get(PROGRESS_API.BY_USER(userId))
    }

    async getByUserCourse(
        userId: number | string,
        courseId: number | string
    ): Promise<any> {
        return await http.get(PROGRESS_API.BY_USER_COURSE(userId, courseId))
    }

    async getSummary(): Promise<any> {
        return await http.get(PROGRESS_API.SUMMARY)
    }

    async isCompletedCourse(
        userId: number | string,
        courseId: number | string
    ): Promise<any> {
        return await http.get(
            PROGRESS_API.IS_COURSE_COMPLETED(userId, courseId)
        )
    }
}

export default new ProgressService()
