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

const initialUserState: UserState = {
    username: '',
    menuList: [],
    logged: false,
    role: 'guest',
    device: 'DESKTOP',
    collapsed: false,
    noticeCount: 0,
    locale: 'en_US',
    newUser: true,
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
                putLocalStorage(
                    CREDENTIALS.AUTHENTICATION_TOKEN,
                    action.payload.data.accessToken
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
