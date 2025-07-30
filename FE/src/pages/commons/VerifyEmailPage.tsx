import { useEffect } from 'react'

import { Button, notification } from 'antd'

import { useLocation, useNavigate } from 'react-router-dom'

import { PATHS } from '@/routers/path'
import AuthService from '@/services/auth'

const VerifyEmailPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const queryString = location.search
    const params = new URLSearchParams(queryString)

    const verifyEmail = async () => {
        try {
            const res = await AuthService.verifyEmail({
                signature: params.get('signature'),
            })
            if (res.status === 200) {
                notification.open({
                    type: 'success',
                    message: 'Xác thực thành công',
                    description: 'Đang quay trở về trang đăng nhập',
                })
                setTimeout(() => {
                    navigate(PATHS.AUTH)
                }, 1000)
            } else {
                notification.open({
                    type: 'warning',
                    message: res.message,
                    btn: (
                        <Button href={PATHS.HOME} variant="outlined">
                            Quay về trang chủ
                        </Button>
                    ),
                })
            }
        } catch (err) {
            notification.open({
                type: 'error',
                message: 'Xác thực email thất bại',
                btn: (
                    <Button href={PATHS.HOME} variant="outlined">
                        Quay về trang chủ
                    </Button>
                ),
            })
        }
    }

    useEffect(() => {
        verifyEmail()
    }, [params])

    return <div></div>
}

export default VerifyEmailPage
