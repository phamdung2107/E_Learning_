import React, { useState } from 'react'

import { Button, Card, Form, Input, notification } from 'antd'

import { MailOutlined } from '@ant-design/icons'

import AuthService from '@/services/auth'

const ForgotPasswordPage = () => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    const onFinish = async (values: any) => {
        setLoading(true)
        try {
            const res = await AuthService.forgotPassword({
                email: values.email,
            })
            if (res.status === 200) {
                notification.success({
                    message:
                        'Gửi yêu cầu quên mật khẩu thành công. Vui lòng kiểm tra hộp thư!',
                })
                form.resetFields()
            }
        } catch (e: any) {
            notification.error({
                message: 'Gửi yêu cầu quên mật khẩu không thành công',
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
                title="Quên mật khẩu"
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
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập email!',
                            },
                            {
                                type: 'email',
                                message: 'Email không hợp lệ!',
                            },
                        ]}
                    >
                        <Input
                            allowClear
                            prefix={
                                <MailOutlined style={{ color: '#bfbfbf' }} />
                            }
                            placeholder="Email"
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
                            GỬI YÊU CẦU
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default ForgotPasswordPage
