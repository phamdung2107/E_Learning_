import { ENROLLMENT_API } from '@/constants/api'
import http from '@/services/http'

class EnrollmentService {
    async getAll(): Promise<any> {
        return await http.get(ENROLLMENT_API.LIST)
    }

    async getDetail(id: number | string): Promise<any> {
        return await http.get(ENROLLMENT_API.DETAIL(id))
    }

    async countByCourse(courseId: number | string): Promise<any> {
        return await http.get(ENROLLMENT_API.COUNT_BY_COURSE(courseId))
    }

    async getUsersByCourse(courseId: number | string): Promise<any> {
        return await http.get(ENROLLMENT_API.USERS_BY_COURSE(courseId))
    }

    async getCoursesByUser(userId: number | string): Promise<any> {
        return await http.get(ENROLLMENT_API.COURSES_BY_USER(userId))
    }

    async getTopCourses(): Promise<any> {
        return await http.get(ENROLLMENT_API.TOP_COURSES)
    }

    async checkEnrollment(userId: any, courseId: any): Promise<any> {
        return await http.get(ENROLLMENT_API.CHECK_ENROLLMENT(userId, courseId))
    }
}

export default new EnrollmentService()
