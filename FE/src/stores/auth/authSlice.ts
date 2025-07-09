import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { CREDENTIALS } from '@/constants/storage'
import { AuthSliceState } from '@/interfaces/store/auth.interface'
import { UserState } from '@/interfaces/user/user.interface'
import {
    getLocalStorage,
    putLocalStorage,
    removeLocalStorage,
} from '@/utils/storage'

import { getCurrentUserAction, loginAction } from './authAction'

const initialUserState: any = {
    id: null,
    full_name: null,
    email: null,
    phone: null,
    gender: null,
    date_of_birth: null,
    role: null,
    avatar: null,
    status: null,
    money: null,
}

const initialState: AuthSliceState = {
    isAuthenticated: Boolean(getLocalStorage(CREDENTIALS.IS_LOGIN)) || false,
    user: initialUserState,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false
            state.user = null
            removeLocalStorage(CREDENTIALS.IS_LOGIN)
            removeLocalStorage(CREDENTIALS.AUTHENTICATION_TOKEN)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAction.fulfilled, (state, action: any) => {
                console.log('Login ', action)
                putLocalStorage(
                    CREDENTIALS.AUTHENTICATION_TOKEN,
                    action.payload
                )
            })
            .addCase(getCurrentUserAction.fulfilled, (state, action) => {
                state.isAuthenticated = true
                putLocalStorage(CREDENTIALS.IS_LOGIN, 'true')
                state.user = action.payload
            })
            .addCase(getCurrentUserAction.rejected, (state, action) => {
                state.isAuthenticated = false
                state.user = null
            })
    },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
