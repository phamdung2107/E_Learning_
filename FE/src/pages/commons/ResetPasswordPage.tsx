import React, { useEffect } from 'react'

import { Button, Card, Form, Input, notification } from 'antd'

import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'

import { PATHS } from '@/routers/path'
import AuthService from '@/services/auth'

const ResetPasswordPage = () => {
    const [form] = Form.useForm()
    const [loading, setLoading] = React.useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const queryString = location.search
    const params = new URLSearchParams(queryString)

    const onFinish = async (values: any) => {
        setLoading(true)
        try {
            const res = await AuthService.updatePassword({
                signature: params.get('signature'),
                password: values.password,
            })
            if (res.status === 200) {
                notification.open({
                    type: 'success',
                    message: 'Đặt lại mật khẩu thành công',
                })
                setTimeout(() => {
                    navigate(PATHS.AUTH)
                }, 1000)
            } else {
                notification.open({
                    type: 'warning',
                    message: res.message,
                })
            }
        } catch (err) {
            notification.open({
                type: 'error',
                message: 'Xác thực email thất bại',
                btn: <Button variant="outlined">Quay về trang chủ</Button>,
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
            }}
        >
            <Card
                title="Đặt lại mật khẩu"
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    border: 'none',
                }}
                styles={{ body: { padding: '40px 32px' } }}
            >
                <Form
                    form={form}
                    name="login"
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                >
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu!',
                            },
                            {
                                min: 6,
                                message: 'Mật khẩu phải có ít nhất 6 ký tự!',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={
                                <LockOutlined style={{ color: '#bfbfbf' }} />
                            }
                            placeholder="Mật khẩu"
                            style={{
                                borderRadius: '8px',
                                padding: '12px 16px',
                                backgroundColor: '#f8f9fa',
                                border: '1px solid #e9ecef',
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng xác nhận mật khẩu!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue('password') === value
                                    ) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject(
                                        new Error(
                                            'Mật khẩu xác nhận không khớp!'
                                        )
                                    )
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={
                                <LockOutlined style={{ color: '#bfbfbf' }} />
                            }
                            placeholder="Xác nhận mật khẩu"
                            style={{
                                borderRadius: '8px',
                                padding: '12px 16px',
                                backgroundColor: '#f8f9fa',
                                border: '1px solid #e9ecef',
                            }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            loading={loading}
                            type="primary"
                            htmlType="submit"
                            block
                            style={{
                                height: '48px',
                                borderRadius: '8px',
                                fontSize: '16px',
                                fontWeight: '600',
                                background:
                                    'linear-gradient(135deg, #4285f4 0%, #1976d2 100%)',
                                border: 'none',
                                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                            }}
                        >
                            ĐẶT LẠI MẬT KHẨU
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default ResetPasswordPage
