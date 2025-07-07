import React, { useState } from 'react'

import { Alert, Button, Card, Col, Form, Input, Row } from 'antd'

import { LockOutlined, UserOutlined } from '@ant-design/icons'

import { PATHS } from '@/routers/path'
import AuthService from '@/services/auth'

const RegisterPage = () => {
    const [passwordVisible, setPasswordVisible] = React.useState(false)
    const [submitLoading, setSubmitLoading] = React.useState(false)
    const [error, setError] = useState('')
    const onFinish = async (values: any) => {
        setError('')
        setPasswordVisible(true)
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Card
                className="login-card"
                style={{
                    width: '30vw',
                    height: 'auto',
                    marginTop: '50px',
                }}
            >
                {error && <Alert message={error} type="error" />}
                <Form
                    name="normal_login"
                    className="login-form"
                    layout="vertical"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="username"
                        label="Tên người dùng"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên của bạn!',
                            },
                        ]}
                    >
                        <Input
                            allowClear
                            size="large"
                            prefix={
                                <UserOutlined className="site-form-item-icon" />
                            }
                            placeholder="Nhập họ tên"
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập email!',
                            },
                        ]}
                    >
                        <Input
                            allowClear
                            size="large"
                            prefix={
                                <UserOutlined className="site-form-item-icon" />
                            }
                            placeholder="Nhập email"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu!',
                            },
                        ]}
                    >
                        <Input.Password
                            allowClear
                            visibilityToggle={{
                                visible: passwordVisible,
                                onVisibleChange: setPasswordVisible,
                            }}
                            size="large"
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            type="password"
                            placeholder="Nhập mật khẩu"
                        />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        label="Xác nhận mật khẩu"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập xác nhận mật khẩu!',
                            },
                        ]}
                    >
                        <Input.Password
                            allowClear
                            visibilityToggle={{
                                visible: passwordVisible,
                                onVisibleChange: setPasswordVisible,
                            }}
                            size="large"
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            type="password"
                            placeholder="Nhập xác nhận mật khẩu"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Row align="middle" justify="space-between">
                            <Col span={18}>
                                <div
                                    style={{
                                        float: 'left',
                                    }}
                                >
                                    <div>
                                        Bạn đã có tài khoản?
                                        <Button type="link" href={PATHS.LOGIN}>
                                            Đăng nhập
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                            <Col span={6}>
                                <Button
                                    size="large"
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    loading={submitLoading}
                                    style={{
                                        float: 'right',
                                    }}
                                >
                                    Đăng kí
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default RegisterPage
