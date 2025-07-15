import { createSlice } from '@reduxjs/toolkit'

import { CART } from '@/constants/storage'
import { getLocalStorage, putLocalStorage } from '@/utils/storage'

import { getCurrentCartAction } from './cartAction'


const initialState = {
    count: getLocalStorage(CART.COUNT) ? JSON.parse(<string>getLocalStorage(CART.COUNT)) : 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state) => {
            state.count = 0
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCurrentCartAction.fulfilled, (state, action) => {
                const countOrder = action.payload.filter((order: any) => order.payment_status === 'pending').length
                putLocalStorage(CART.COUNT, JSON.stringify(countOrder))
                state.count = countOrder
            })
            .addCase(getCurrentCartAction.rejected, (state, action) => {
                state.count = 0
            })
    },
})

export const { setCart } = cartSlice.actions

export default cartSlice.reducer
