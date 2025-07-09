import { UserState } from '@/interfaces/user/user.interface'

export interface AuthSliceState {
    isAuthenticated: boolean
    user: UserState | null
}
