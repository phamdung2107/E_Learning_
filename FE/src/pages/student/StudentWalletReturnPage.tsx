import { useEffect, useState } from 'react'

import { Button, Result, Spin } from 'antd'

import {
    FrownOutlined,
    LoadingOutlined,
    SmileOutlined,
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'

import { STUDENT_PATHS } from '@/routers/path'
import PaymentService from '@/services/payment'
import { formatPrice } from '@/utils/format'

const StudentWalletReturnPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [status, setStatus] = useState('pending')
    const [amount, setAmount] = useState<any>(0)

    const getQueryParams = () => {
        const searchParams: any = new URLSearchParams(location.search)
        const params: any = {}
        for (let [key, value] of searchParams.entries()) {
            params[key] = value
        }
        return params
    }

    const checkPayment = async (params: any) => {
        try {
            const res = await PaymentService.process(params)
            if (res.status === 200) {
                setStatus('success')
                setAmount(res.data.total_added)
            } else {
                setStatus('fail')
            }
        } catch (err) {
            setStatus('fail')
        }
    }

    useEffect(() => {
        const params = getQueryParams()
        checkPayment(params)
    }, [location.search])

    const handleBack = () => {
        navigate(STUDENT_PATHS.STUDENT_TRANSACTIONS)
    }

    if (status === 'pending') {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '60vh',
                }}
            >
                <Spin
                    indicator={
                        <LoadingOutlined style={{ fontSize: 48 }} spin />
                    }
                    tip="Đang kiểm tra thanh toán..."
                />
            </div>
        )
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '60vh',
            }}
        >
            {status === 'success' ? (
                <Result
                    status="success"
                    icon={<SmileOutlined style={{ color: '#52c41a' }} />}
                    title="Thanh toán thành công!"
                    subTitle={amount ? `Số tiền: ${formatPrice(amount)}` : ''}
                    extra={[
                        <Button type="primary" key="home" onClick={handleBack}>
                            Về trang chủ
                        </Button>,
                    ]}
                />
            ) : (
                <Result
                    status="error"
                    icon={<FrownOutlined style={{ color: '#ff4d4f' }} />}
                    title="Thanh toán không thành công!"
                    subTitle="Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại hoặc liên hệ hỗ trợ."
                    extra={[
                        <Button type="primary" key="home" onClick={handleBack}>
                            Về trang chủ
                        </Button>,
                    ]}
                />
            )}
        </div>
    )
}

export default StudentWalletReturnPage
