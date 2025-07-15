import { createSlice } from '@reduxjs/toolkit'

import { CART, CREDENTIALS, NOTIFICATION } from '@/constants/storage'
import { getLocalStorage, putLocalStorage, removeLocalStorage } from '@/utils/storage'

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

const initialState = {
    isAuthenticated: Boolean(getLocalStorage(CREDENTIALS.IS_LOGIN)) || false,
    user: getLocalStorage(CREDENTIALS.USER_INFO) ? JSON.parse(<string>getLocalStorage(CREDENTIALS.USER_INFO)) : initialUserState,
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
            removeLocalStorage(CREDENTIALS.USER_INFO)
            removeLocalStorage(CART.COUNT)
            removeLocalStorage(NOTIFICATION.COUNT)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAction.fulfilled, (state, action: any) => {
                putLocalStorage(
                    CREDENTIALS.AUTHENTICATION_TOKEN,
                    action.payload,
                )
            })
            .addCase(getCurrentUserAction.fulfilled, (state, action) => {
                state.isAuthenticated = true
                putLocalStorage(CREDENTIALS.IS_LOGIN, 'true')
                putLocalStorage(CREDENTIALS.USER_INFO, JSON.stringify(action.payload))
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
