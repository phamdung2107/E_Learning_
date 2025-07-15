import { INSTRUCTOR_API } from '@/constants/api'
import http from '@/services/http'

class InstructorService {
    async getAll(params: any): Promise<any> {
        return await http.get(INSTRUCTOR_API.LIST(params))
    }

    async create(payload: any): Promise<any> {
        return await http.post(INSTRUCTOR_API.CREATE, payload)
    }

    async getDetail(id: number | string): Promise<any> {
        return await http.get(INSTRUCTOR_API.DETAIL(id))
    }

    async update(id: number | string, payload: any): Promise<any> {
        return await http.put(INSTRUCTOR_API.UPDATE(id), payload)
    }

    async delete(id: number | string): Promise<any> {
        return await http.delete(INSTRUCTOR_API.DELETE(id))
    }

    async approve(userId: number | string): Promise<any> {
        return await http.post(INSTRUCTOR_API.APPROVE(userId))
    }

    async reject(userId: number | string): Promise<any> {
        return await http.post(INSTRUCTOR_API.REJECT(userId))
    }

    async requestBecomeInstructor(payload: any): Promise<any> {
        return await http.post(INSTRUCTOR_API.REQUEST, payload)
    }

    async getByUser(userId: number | string): Promise<any> {
        return await http.get(INSTRUCTOR_API.GET_BY_USER(userId))
    }

    async getTopRevenue(): Promise<any> {
        return await http.get(INSTRUCTOR_API.TOP_REVENUE)
    }

    async getCourses(id: number | string): Promise<any> {
        return await http.get(INSTRUCTOR_API.COURSES(id))
    }

    async getRevenue(id: number | string): Promise<any> {
        return await http.get(INSTRUCTOR_API.REVENUE(id))
    }

    async getMonthlyRevenue(id: number | string): Promise<any> {
        return await http.get(INSTRUCTOR_API.MONTHLY_REVENUE(id))
    }

    async getStudents(id: number | string): Promise<any> {
        return await http.get(INSTRUCTOR_API.STUDENTS(id))
    }
}

export default new InstructorService()
