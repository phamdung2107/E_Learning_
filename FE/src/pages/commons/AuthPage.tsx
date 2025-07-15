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
import { getCurrentInstructorAction, getCurrentUserAction, loginAction } from '@/stores/auth/authAction'
import { getCurrentCartAction } from '@/stores/cart/cartAction'
import { getCurrentNotificationAction } from '@/stores/notification/notificationAction'
import { setInstructor } from '@/stores/auth/authSlice'

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
                    const instructorRes = await dispatch(getCurrentInstructorAction(userResponse.payload.id))
                    if (instructorRes.payload) {
                        dispatch(setInstructor(instructorRes.payload))
                    }
                    notification.success({
                        message: 'Login success!',
                        description: 'Welcome back',
                    })
                    navigate(PATHS.HOME)
                }
            } else {
                notification.error({
                    message: 'Login failed!',
                    description: loginResponse.payload?.message || 'Invalid credentials',
                })
            }
        } catch (e: any) {
            notification.error({
                message: 'Login failed!',
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
                    message: 'Register success!',
                    description: 'Please input your account to login',
                })
                registerForm.resetFields()
                setActiveTab('login')
            }
        } catch (e: any) {
            notification.error({
                message: 'Register failed!',
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
                                    Sign In
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
                                    Sign Up
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
                                    message: 'Please input your email!',
                                },
                                {
                                    type: 'email',
                                    message: 'Invalid email address!',
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
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password
                                prefix={
                                    <LockOutlined
                                        style={{ color: '#bfbfbf' }}
                                    />
                                }
                                placeholder="Password"
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
                                            Remember
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
                                            'Forget password is not supported!'
                                        )
                                    }}
                                >
                                    Forgot password?
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
                                SIGN IN
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
                                    message: 'Please input your full name!',
                                },
                            ]}
                        >
                            <Input
                                prefix={
                                    <UserOutlined
                                        style={{ color: '#bfbfbf' }}
                                    />
                                }
                                placeholder="Full name"
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
                                    message: 'Please input your email!',
                                },
                                {
                                    type: 'email',
                                    message: 'Invalid email address!',
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
                                    message: 'Please input your password!',
                                },
                                {
                                    min: 6,
                                    message:
                                        'Password must be at least 6 characters long!',
                                },
                            ]}
                        >
                            <Input.Password
                                prefix={
                                    <LockOutlined
                                        style={{ color: '#bfbfbf' }}
                                    />
                                }
                                placeholder="Password"
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
                                    message: 'Please confirm your password!',
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
                                                'Confirm password is not the same as password!'
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
                                placeholder="Confirm password"
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
                                    message: 'Please agree to the terms!',
                                },
                            ]}
                            style={{ marginBottom: '24px' }}
                        >
                            <Checkbox>
                                <Text
                                    style={{ color: '#666', fontSize: '14px' }}
                                >
                                    I agree to the{' '}
                                    <Link href="#" style={{ color: '#1976d2' }}>
                                        Terms of Use
                                    </Link>{' '}
                                    and{' '}
                                    <Link href="#" style={{ color: '#1976d2' }}>
                                        Privacy Policy
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
                                SIGN UP
                            </Button>
                        </Form.Item>
                    </Form>
                )}

                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <Text style={{ color: '#666', fontSize: '14px' }}>
                        {activeTab === 'login'
                            ? 'No account? '
                            : 'Already have an account? '}
                        <Link
                            onClick={() =>
                                setActiveTab(
                                    activeTab === 'login' ? 'register' : 'login'
                                )
                            }
                            style={{ color: '#1976d2', fontWeight: '500' }}
                        >
                            {activeTab === 'login'
                                ? 'Sign up now'
                                : 'Sign in now'}
                        </Link>
                    </Text>
                </div>
            </Card>
        </div>
    )
}

export default AuthPage
