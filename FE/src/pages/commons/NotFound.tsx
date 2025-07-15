import React, { useMemo } from 'react'

import { Button, Result } from 'antd'

import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { PATHS } from '@/routers/path'

const NotFound: React.FC = () => {
    const user = useSelector((state: any) => state.auth.user)
    const navigate = useNavigate()
    const location = useLocation()

    const navigateRoute = useMemo(() => {
        if (user && location.pathname.startsWith(`/${user.role}`)) {
            return `/${user.role}`
        } else {
            return PATHS.HOME
        }
    }, [user, location.pathname])

    return (
        <Result
            status="404"
            title="404"
            subTitle={'Sorry, the page you visited does not exist.\n'}
            extra={
                <Button type="primary" onClick={() => navigate(navigateRoute)}>
                    {'Turn Back Home'}
                </Button>
            }
        ></Result>
    )
}

export default NotFound
