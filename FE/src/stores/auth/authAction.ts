import { createAsyncThunk } from '@reduxjs/toolkit'

import { AUTH_API } from '@/constants/api'
import { LoginDto } from '@/interfaces/auth/auth.interface'
import AuthService from '@/services/auth'

export const loginAction: any = createAsyncThunk(
    AUTH_API.LOGIN,
    async (credentials: LoginDto, { rejectWithValue }) => {
        const res = await AuthService.login(credentials)
        return res.data
    }
)

export const getCurrentUserAction: any = createAsyncThunk(
    AUTH_API.ME,
    async (credentials, { rejectWithValue }) => {
        const res = await AuthService.getCurrentUser()
        return res.data
    }
)
