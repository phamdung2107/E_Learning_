import { useEffect, useState } from 'react'

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

import { ReloadOutlined, UploadOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { StudentDepositModal } from '@/components/core/modal/StudentDepositModal'
import InstructorService from '@/services/instructor'
import PaymentService from '@/services/payment'
import UserService from '@/services/user'
import { getCurrentUserAction } from '@/stores/auth/authAction'
import { formatPrice } from '@/utils/format'

export const InstructorProfilePage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [activeTabKey, setActiveTabKey] = useState<string>('profile')
    const [form] = Form.useForm()
    const [passwordForm] = Form.useForm()
    const currentUser = useSelector((state: any) => state.auth.user)
    const [previewImage, setPreviewImage] = useState(currentUser?.avatar || '')
    const [selectedFile, setSelectedFile] = useState(null)
    const [isModalDepositOpen, setIsModalDepositOpen] = useState(false)
    const [depositLoading, setDepositLoading] = useState(false)
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

    useEffect(() => {
        if (currentUser) {
            form.setFieldsValue({
                ...currentUser.user,
                bio: currentUser.bio || '',
                experience_years: currentUser.experience_years || 0,
                linkedin_url: currentUser.linkedin_url || '',
            })
            setPreviewImage(currentUser?.user?.avatar || '')
        }
    }, [currentUser])

    const onTabChange = (key: string) => {
        setActiveTabKey(key)
    }

    const handleUpdateProfile = async (values: any) => {
        try {
            const resUser = await UserService.update(currentUser.user.id, {
                full_name: values.full_name,
                email: values.email,
                date_of_birth: values.date_of_birth,
                gender: values.gender,
                phone: values.phone,
            })
            if (resUser.status === 200) {
                notification.success({
                    message: 'Update profile success',
                })
                dispatch(getCurrentUserAction())
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

    const handleDeposit = async (values: any) => {
        setDepositLoading(true)
        try {
            const response = await PaymentService.create({
                amount: values.amount,
            })
            if (response.status === 200) {
                notification.success({
                    message: 'Deposit success',
                })
                window.open(
                    response.data.payment_url.original.payment_url,
                    '_blank'
                )
            }
        } catch (error) {
            console.error('Error depositing:', error)
            notification.error({
                message: 'Error depositing',
            })
        } finally {
            setDepositLoading(false)
            setIsModalDepositOpen(false)
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
                        <Input placeholder="Enter full name" />
                    </Form.Item>
                    <Form.Item name="email" label="Email">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="bio"
                        label="Bio"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your bio',
                            },
                        ]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name="experience_years"
                        label="Experience years"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your experience years',
                            },
                        ]}
                    >
                        <Input disabled type="number" />
                    </Form.Item>
                    <Form.Item
                        name="linkedin_url"
                        label="LinkedIn url"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your linkedin url',
                            },
                        ]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Money">
                        <Input.Group compact>
                            <Form.Item
                                name="money"
                                noStyle
                                getValueProps={(value) => ({
                                    value: value
                                        ? formatPrice(Number(value))
                                        : '',
                                })}
                            >
                                <Input style={{ width: '80%' }} disabled />
                            </Form.Item>
                            <Button
                                style={{ width: '20%' }}
                                type="primary"
                                onClick={() => setIsModalDepositOpen(true)}
                            >
                                Deposit
                            </Button>
                        </Input.Group>
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
                        <Select allowClear placeholder="Select your gender">
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
                        <Button
                            type="default"
                            style={{ marginLeft: 8 }}
                            onClick={() => form.resetFields()}
                        >
                            Reset
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
                        <Input.Password placeholder="Enter current password" />
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
                        <Input.Password placeholder="Enter new password" />
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
                        <Input.Password placeholder="Enter confirm password" />
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
        <div style={{ width: '100%', height: '100%' }}>
            <Card
                style={{ width: '100%', height: '100%' }}
                tabList={tabListNoTitle}
                activeTabKey={activeTabKey}
                tabBarExtraContent={
                    <Button
                        icon={<ReloadOutlined />}
                        onClick={() => dispatch(getCurrentUserAction())}
                        type="link"
                    >
                        Refresh
                    </Button>
                }
                onTabChange={onTabChange}
                tabProps={{
                    size: 'middle',
                }}
            >
                {contentListNoTitle[activeTabKey]}
            </Card>
            <StudentDepositModal
                visible={isModalDepositOpen}
                onClose={() => {
                    // @ts-ignore
                    setIsModalDepositOpen(false)
                }}
                onSubmit={(values: any) => handleDeposit(values)}
                loading={depositLoading}
            />
        </div>
    )
}
