import { createSlice } from '@reduxjs/toolkit'

import { NOTIFICATION } from '@/constants/storage'
import { getLocalStorage, putLocalStorage } from '@/utils/storage'

import { getCurrentNotificationAction } from '@/stores/notification/notificationAction'


const initialState = {
    count: getLocalStorage(NOTIFICATION.COUNT) ? JSON.parse(<string>getLocalStorage(NOTIFICATION.COUNT)) : 0,
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state) => {
            state.count = 0
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCurrentNotificationAction.fulfilled, (state, action) => {
                putLocalStorage(NOTIFICATION.COUNT, JSON.stringify(action.payload))
                state.count = action.payload
            })
            .addCase(getCurrentNotificationAction.rejected, (state, action) => {
                state.count = 0
            })
    },
})

export const { setNotification } = notificationSlice.actions

export default notificationSlice.reducer
