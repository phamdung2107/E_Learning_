import { useState } from 'react'

import {
    Button,
    Card,
    Form,
    Image,
    Input,
    Select,
    Upload,
    notification,
} from 'antd'

import { UploadOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'

import UserService from '@/services/user'

export const StudentProfilePage = () => {
    const [activeTabKey, setActiveTabKey] = useState<string>('profile')
    const [form] = Form.useForm()
    const [passwordForm] = Form.useForm()
    const currentUser = useSelector((state: any) => state.auth.user)
    const [previewImage, setPreviewImage] = useState(currentUser?.avatar || '')
    const [selectedFile, setSelectedFile] = useState(null)
    const tabListNoTitle = [
        {
            key: 'profile',
            label: 'Profile',
        },
        {
            key: 'password',
            label: 'Password',
        },
    ]

    const onTabChange = (key: string) => {
        setActiveTabKey(key)
    }

    const handleUpdateProfile = async (values: any) => {
        try {
            const res = await UserService.update(currentUser.id, values)
            if (res.status === 200) {
                notification.success({
                    message: 'Update profile success',
                })
            }
        } catch (error) {
            console.error('Error updating profile:', error)
            notification.error({
                message: 'Error updating profile',
            })
        }
    }

    const handleFileChange = (info: any) => {
        const file = info.file
        if (file) {
            setSelectedFile(file)
            setPreviewImage(URL.createObjectURL(file))
        }
    }

    const handleChangePassword = async (values: any) => {
        if (values.new_password !== values.confirm_password) {
            return notification.error({
                message: 'Passwords do not match',
            })
        }
        try {
            const res = await UserService.changePassword(values)
            if (res.status === 200) {
                notification.success({
                    message: 'Change password success',
                })
            } else {
                notification.error(res.data)
            }
            passwordForm.resetFields()
        } catch (error) {
            console.error('Error changing password:', error)
            notification.error({
                message: 'Error changing password',
            })
        }
    }

    const contentListNoTitle: Record<string, React.ReactNode> = {
        profile: (
            <div>
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={currentUser}
                    onFinish={handleUpdateProfile}
                    style={{ marginTop: 24, maxWidth: 500 }}
                >
                    <div
                        style={{
                            display: 'flex',
                            gap: '24px',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            width={100}
                            height={100}
                            style={{
                                borderRadius: '50%',
                                objectFit: 'cover',
                                objectPosition: 'center',
                            }}
                            src={
                                previewImage ||
                                'https://placehold.co/100x100?text=Avatar'
                            }
                        />
                        <Upload
                            beforeUpload={() => false}
                            showUploadList={false}
                            onChange={handleFileChange}
                            accept="image/*"
                        >
                            <Button icon={<UploadOutlined />}>
                                Choose image
                            </Button>
                        </Upload>
                    </div>
                    <br />
                    <Form.Item
                        name="full_name"
                        label="Full name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your full name',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="date_of_birth" label="Birthday">
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[
                            {
                                required: true,
                                message: 'Please select your gender',
                            },
                        ]}
                    >
                        <Select>
                            <Select.Option value="male">Male</Select.Option>
                            <Select.Option value="female">Female</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item hidden name="avatar">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Save changes
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        ),
        password: (
            <div>
                <Form
                    style={{ marginTop: 24, maxWidth: 500 }}
                    layout="vertical"
                    form={passwordForm}
                    onFinish={handleChangePassword}
                >
                    <Form.Item
                        name="oldPassword"
                        label="Current password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your current password',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="newPassword"
                        label="New password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input new password',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        label="Confirm password"
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm new password',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Change password
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        ),
    }

    return (
        <Card
            style={{ width: '100%', height: '100%' }}
            tabList={tabListNoTitle}
            activeTabKey={activeTabKey}
            onTabChange={onTabChange}
            tabProps={{
                size: 'middle',
            }}
        >
            {contentListNoTitle[activeTabKey]}
        </Card>
    )
}
