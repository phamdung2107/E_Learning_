import type { FC } from 'react'

import { Button, Checkbox, Form, Input, theme as antTheme } from 'antd'

import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import type { LoginDto } from '@/interfaces/auth/auth.interface'

const initialValues: LoginDto = {
    username: 'guest',
    password: 'guest',
}

const LoginForm: FC = () => {
    const navigate = useNavigate()
    useLocation()
    const dispatch = useDispatch()
    const { token } = antTheme.useToken()

    const onFinished = async (form: LoginDto) => {}

    return (
        <div
            className="login-page"
            style={{ backgroundColor: token.colorBgContainer }}
        >
            <Form<LoginDto>
                onFinish={onFinished}
                className="login-page-form"
                initialValues={initialValues}
            >
                <h2>REACT ANTD ADMIN</h2>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Fill your username',
                        },
                    ]}
                >
                    <Input placeholder={'Username'} />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Fill your password',
                        },
                    ]}
                >
                    <Input type="password" placeholder={'Password'} />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Remember User</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button
                        htmlType="submit"
                        type="primary"
                        className="login-page-form_button"
                    >
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default LoginForm
