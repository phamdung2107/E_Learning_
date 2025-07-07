import { createAsyncThunk } from '@reduxjs/toolkit'

import { AUTH_API, USER_API } from '@/constants/api'
import { LoginDto } from '@/interfaces/auth/auth.interface'
import AuthService from '@/services/auth'
import UserService from '@/services/user'

export const loginAction = createAsyncThunk(
    AUTH_API.LOGIN,
    async (credentials: LoginDto, { rejectWithValue }) => {
        const res = await AuthService.login(credentials)
        return res.data
    }
)

export const getCurrentUserAction = createAsyncThunk(
    USER_API.GET_CURRENT_USER,
    async (credentials, { rejectWithValue }) => {
        const res = await UserService.getCurrentUser()
        return res.data
    }
)
