import { configureStore } from '@reduxjs/toolkit'

import authReducer from './auth/authSlice'
import cartReducer from './cart/cartSlice'
import notificationReducer from './notification/notificationSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        notification: notificationReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
})

export default store
