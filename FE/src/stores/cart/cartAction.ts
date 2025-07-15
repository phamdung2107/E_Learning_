import { createAsyncThunk } from '@reduxjs/toolkit'

import { ORDER_API } from '@/constants/api'
import OrderService from '@/services/order'

export const getCurrentCartAction: any = createAsyncThunk(
    ORDER_API.MY_ORDERS,
    async (credentials: any, { rejectWithValue }) => {
        const res = await OrderService.getMyOrders()
        return res.data
    }
)
