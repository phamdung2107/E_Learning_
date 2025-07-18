import React from 'react'

import { notification } from 'antd'

import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

import { PATHS } from '@/routers/path'

const RequiredAuth: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const isAuthenticated = useSelector(
        (state: any) => state.auth.isAuthenticated
    )
    const location = useLocation()

    if (!isAuthenticated) {
        notification.error({
            message: 'You are not authenticated or not authorized',
        })
        return <Navigate to={PATHS.AUTH} state={{ from: location }} replace />
    }

    return <>{children}</>
}

export default RequiredAuth
