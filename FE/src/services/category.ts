import { CATEGORY_API } from '@/constants/api'
import http from '@/services/http'

class CategoryService {
    async getAll(params: any): Promise<any> {
        return await http.get(CATEGORY_API.LIST(params))
    }

    async create(payload: any): Promise<any> {
        return await http.post(CATEGORY_API.CREATE, payload)
    }

    async getDetail(id: number | string): Promise<any> {
        return await http.get(CATEGORY_API.DETAIL(id))
    }

    async update(id: number | string, payload: any): Promise<any> {
        return await http.put(CATEGORY_API.UPDATE(id), payload)
    }

    async delete(id: number | string): Promise<any> {
        return await http.delete(CATEGORY_API.DELETE(id))
    }

    async getParentCategories(): Promise<any> {
        return await http.get(CATEGORY_API.PARENT_ALL)
    }

    async getTree(): Promise<any> {
        return await http.get(CATEGORY_API.TREE_ALL)
    }

    async getChildren(id: number | string): Promise<any> {
        return await http.get(CATEGORY_API.CHILDREN(id))
    }

    async getCoursesInCategory(id: number | string): Promise<any> {
        return await http.get(CATEGORY_API.COURSES(id))
    }
}

export default new CategoryService()
