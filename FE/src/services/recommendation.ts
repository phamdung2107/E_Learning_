import { AI_RECOMMENDATION_API } from '@/constants/api'
import http from '@/services/http'

class RecommendationService {
    async getAll(): Promise<any> {
        return await http.get(AI_RECOMMENDATION_API.LIST)
    }

    async store(payload: any): Promise<any> {
        return await http.post(AI_RECOMMENDATION_API.STORE, payload)
    }
}

export default new RecommendationService()
