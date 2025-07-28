'use client'

import React, { useEffect, useState } from 'react'

import {
    Button,
    Card,
    Checkbox,
    Col,
    Form,
    Input,
    Row,
    Tabs,
    Typography,
    message,
    notification,
} from 'antd'

import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { PATHS } from '@/routers/path'
import AuthService from '@/services/auth'
import {
    getCurrentInstructorAction,
    getCurrentUserAction,
    loginAction,
} from '@/stores/auth/authAction'
import { setInstructor } from '@/stores/auth/authSlice'
import { getCurrentCartAction } from '@/stores/cart/cartAction'
import { getCurrentNotificationAction } from '@/stores/notification/notificationAction'

const { Text, Link } = Typography

const AuthPage: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('login')
    const [loginForm] = Form.useForm()
    const [registerForm] = Form.useForm()
    const [loginLoading, setLoginLoading] = useState(false)
    const [registerLoading, setRegisterLoading] = useState(false)

    useEffect(() => {
        loginForm.resetFields()
        registerForm.resetFields()
    }, [activeTab, loginForm, registerForm])

    const onLoginFinish = async (values: any) => {
        setLoginLoading(true)
        try {
            const loginResponse = await dispatch(
                loginAction({ email: values.email, password: values.password })
            )

            if (loginResponse.payload && loginResponse.payload.length > 0) {
                const userResponse = await dispatch(getCurrentUserAction())
                dispatch(getCurrentCartAction())
                dispatch(getCurrentNotificationAction())

                const user = userResponse.payload
                if (user) {
                    const instructorRes = await dispatch(
                        getCurrentInstructorAction(userResponse.payload.id)
                    )
                    if (instructorRes.payload) {
                        dispatch(setInstructor(instructorRes.payload))
                    }
                    notification.success({
                        message: 'Đăng nhập thành công!',
                        description: 'Chào mừng bạn quay trở lại',
                    })
                    navigate(PATHS.HOME)
                }
            } else {
                notification.error({
                    message: 'Đăng nhập thất bại!',
                    description:
                        loginResponse.payload?.message ||
                        'Tài khoản hoặc mật khẩu không đúng',
                })
            }
        } catch (e: any) {
            notification.error({
                message: 'Đăng nhập thất bại!',
                description: e.message,
            })
        } finally {
            setLoginLoading(false)
            setRegisterLoading(false)
        }
    }

    const onRegisterFinish = async (values: any) => {
        setLoginLoading(true)
        try {
            const response = await AuthService.register({
                full_name: values.fullName,
                email: values.email,
                password: values.password,
                password_confirmation: values.confirmPassword,
            })
            if (response.status === 200) {
                notification.success({
                    message: 'Đăng ký thành công!',
                    description: 'Vui lòng đăng nhập để tiếp tục',
                })
                registerForm.resetFields()
                setActiveTab('login')
            }
        } catch (e: any) {
            notification.error({
                message: 'Đăng ký thất bại!',
                description: e.message,
            })
        } finally {
            setRegisterLoading(false)
            setLoginLoading(false)
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
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    border: 'none',
                }}
                styles={{ body: { padding: '40px 32px' } }}
            >
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    centered
                    style={{ marginBottom: '32px' }}
                    items={[
                        {
                            key: 'login',
                            label: (
                                <span
                                    style={{
                                        fontSize: '16px',
                                        fontWeight:
                                            activeTab === 'login'
                                                ? '600'
                                                : '400',
                                        padding: '8px 24px',
                                    }}
                                >
                                    Đăng nhập
                                </span>
                            ),
                        },
                        {
                            key: 'register',
                            label: (
                                <span
                                    style={{
                                        fontSize: '16px',
                                        fontWeight:
                                            activeTab === 'register'
                                                ? '600'
                                                : '400',
                                        padding: '8px 24px',
                                    }}
                                >
                                    Đăng ký
                                </span>
                            ),
                        },
                    ]}
                />

                {activeTab === 'login' ? (
                    <Form
                        form={loginForm}
                        name="login"
                        onFinish={onLoginFinish}
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
                                prefix={
                                    <MailOutlined
                                        style={{ color: '#bfbfbf' }}
                                    />
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

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu!',
                                },
                            ]}
                        >
                            <Input.Password
                                prefix={
                                    <LockOutlined
                                        style={{ color: '#bfbfbf' }}
                                    />
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

                        <Row
                            justify="space-between"
                            align="middle"
                            style={{ marginBottom: '24px' }}
                        >
                            <Col>
                                <Form.Item
                                    name="remember"
                                    valuePropName="checked"
                                    style={{ margin: 0 }}
                                >
                                    <Checkbox>
                                        <Text
                                            style={{
                                                color: '#666',
                                                fontSize: '14px',
                                            }}
                                        >
                                            Ghi nhớ đăng nhập
                                        </Text>
                                    </Checkbox>
                                </Form.Item>
                            </Col>
                            <Col>
                                <Link
                                    href="#"
                                    style={{
                                        color: '#1976d2',
                                        fontSize: '14px',
                                    }}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        message.info(
                                            'Chức năng quên mật khẩu chưa hỗ trợ!'
                                        )
                                    }}
                                >
                                    Quên mật khẩu?
                                </Link>
                            </Col>
                        </Row>

                        <Form.Item>
                            <Button
                                loading={loginLoading}
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
                                    boxShadow:
                                        '0 4px 12px rgba(25, 118, 210, 0.3)',
                                }}
                            >
                                ĐĂNG NHẬP
                            </Button>
                        </Form.Item>
                    </Form>
                ) : (
                    <Form
                        form={registerForm}
                        name="register"
                        onFinish={onRegisterFinish}
                        layout="vertical"
                        size="large"
                    >
                        <Form.Item
                            name="fullName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập họ và tên!',
                                },
                            ]}
                        >
                            <Input
                                prefix={
                                    <UserOutlined
                                        style={{ color: '#bfbfbf' }}
                                    />
                                }
                                placeholder="Họ và tên"
                                style={{
                                    borderRadius: '8px',
                                    padding: '12px 16px',
                                    backgroundColor: '#f8f9fa',
                                    border: '1px solid #e9ecef',
                                }}
                            />
                        </Form.Item>

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
                                prefix={
                                    <MailOutlined
                                        style={{ color: '#bfbfbf' }}
                                    />
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

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu!',
                                },
                                {
                                    min: 6,
                                    message:
                                        'Mật khẩu phải có ít nhất 6 ký tự!',
                                },
                            ]}
                        >
                            <Input.Password
                                prefix={
                                    <LockOutlined
                                        style={{ color: '#bfbfbf' }}
                                    />
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
                                    <LockOutlined
                                        style={{ color: '#bfbfbf' }}
                                    />
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

                        <Form.Item
                            name="agree"
                            valuePropName="checked"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng đồng ý với điều khoản!',
                                },
                            ]}
                            style={{ marginBottom: '24px' }}
                        >
                            <Checkbox>
                                <Text
                                    style={{ color: '#666', fontSize: '14px' }}
                                >
                                    Tôi đồng ý với{' '}
                                    <Link href="#" style={{ color: '#1976d2' }}>
                                        Điều khoản sử dụng
                                    </Link>{' '}
                                    và{' '}
                                    <Link href="#" style={{ color: '#1976d2' }}>
                                        Chính sách bảo mật
                                    </Link>
                                </Text>
                            </Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                loading={registerLoading}
                                style={{
                                    height: '48px',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    background:
                                        'linear-gradient(135deg, #4285f4 0%, #1976d2 100%)',
                                    border: 'none',
                                    boxShadow:
                                        '0 4px 12px rgba(25, 118, 210, 0.3)',
                                }}
                            >
                                ĐĂNG KÝ
                            </Button>
                        </Form.Item>
                    </Form>
                )}

                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <Text style={{ color: '#666', fontSize: '14px' }}>
                        {activeTab === 'login'
                            ? 'Chưa có tài khoản? '
                            : 'Đã có tài khoản? '}
                        <Link
                            onClick={() =>
                                setActiveTab(
                                    activeTab === 'login' ? 'register' : 'login'
                                )
                            }
                            style={{ color: '#1976d2', fontWeight: '500' }}
                        >
                            {activeTab === 'login'
                                ? 'Đăng ký ngay'
                                : 'Đăng nhập ngay'}
                        </Link>
                    </Text>
                </div>
            </Card>
        </div>
    )
}

export default AuthPage
