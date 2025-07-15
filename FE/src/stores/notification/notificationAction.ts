import { createAsyncThunk } from '@reduxjs/toolkit'

import { NOTIFICATION_API } from '@/constants/api'
import NotificationService from '@/services/notification'

export const getCurrentNotificationAction: any = createAsyncThunk(
    NOTIFICATION_API.LIST_UNREAD,
    async (credentials: any, { rejectWithValue }) => {
        const res = await NotificationService.getAllUnread()
        return res.total
    }
)
