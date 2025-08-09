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

import InstructorWithDrawModal from '@/components/core/modal/InstructorWithDrawModal'
import { BASE_IMAGE_URL } from '@/constants/image'
import PaymentService from '@/services/payment'
import UserService from '@/services/user'
import { getCurrentInstructorAction } from '@/stores/auth/authAction'
import { setInstructor } from '@/stores/auth/authSlice'
import { formatPrice } from '@/utils/format'

const InstructorProfilePage = () => {
    const dispatch = useDispatch()
    const [activeTabKey, setActiveTabKey] = useState<string>('profile')
    const [form] = Form.useForm()
    const [passwordForm] = Form.useForm()
    const currentUser = useSelector((state: any) => state.auth.user)
    const [previewImage, setPreviewImage] = useState(
        `${BASE_IMAGE_URL}${currentUser?.user?.avatar}` || ''
    )
    const [selectedFile, setSelectedFile] = useState<any>(null)
    const [isModalWithDrawOpen, setIsModalWithDrawOpen] = useState(false)
    const [withDrawLoading, setWithDrawLoading] = useState(false)
    const tabListNoTitle = [
        {
            key: 'profile',
            label: 'Thông tin cá nhân',
        },
        {
            key: 'password',
            label: 'Đổi mật khẩu',
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
            setPreviewImage(
                `${BASE_IMAGE_URL}${currentUser?.user?.avatar}` || ''
            )
        }
    }, [currentUser])

    const onTabChange = (key: string) => {
        setActiveTabKey(key)
    }

    const updateInstructorProfile = async () => {
        const instructorRes = await dispatch(
            getCurrentInstructorAction(currentUser?.user?.id)
        )
        if (instructorRes.payload) {
            dispatch(setInstructor(instructorRes.payload))
        }
    }

    const handleUpdateProfile = async (values: any) => {
        try {
            const formData = new FormData()
            formData.append('full_name', values.full_name)
            formData.append('email', values.email)
            formData.append('date_of_birth', values.date_of_birth)
            formData.append('gender', values.gender)
            formData.append('phone', values.phone)
            if (selectedFile && selectedFile instanceof File) {
                formData.append('avatar', selectedFile)
            }
            formData.append('_method', 'PUT')
            const resUser = await UserService.update(
                currentUser.user.id,
                formData
            )
            if (resUser && resUser.status === 200) {
                notification.success({
                    message: 'Cập nhật thông tin thành công',
                })
                await updateInstructorProfile()
            } else {
                notification.warning({
                    // @ts-ignore
                    message: resUser.message,
                })
            }
        } catch (error) {
            console.error('Error updating profile:', error)
            notification.error({
                message: 'Cập nhật thông tin thất bại',
            })
        }
    }

    const handleFileChange = (info: any) => {
        const file = info.file
        if (file) {
            setSelectedFile(file as File)
            setPreviewImage(URL.createObjectURL(file))
        }
    }

    const handleChangePassword = async (values: any) => {
        if (values.new_password !== values.confirm_password) {
            return notification.error({
                message: 'Mật khẩu xác nhận không khớp',
            })
        }
        try {
            const res = await UserService.changePassword(values)
            if (res.status === 200) {
                notification.success({
                    message: 'Đổi mật khẩu thành công',
                })
            } else {
                notification.error(res.data)
            }
            passwordForm.resetFields()
        } catch (error) {
            console.error('Error changing password:', error)
            notification.error({
                message: 'Đổi mật khẩu thất bại',
            })
        }
    }

    const handleWithDraw = async (values: any) => {
        setWithDrawLoading(true)
        try {
            const response = await PaymentService.withdraw({
                amount: values.amount,
                bank_account: values.bank_account,
                note: values.note,
            })
            if (response.status === 200) {
                notification.success({
                    message: 'Gửi yêu cầu rút tiền thành công',
                })
            } else if (response.status === 400) {
                notification.warning({
                    message: response.data.message,
                })
            }
        } catch (error) {
            notification.error({
                message: 'Gửi yêu cầu rút tiền thất bại',
            })
        } finally {
            setWithDrawLoading(false)
            setIsModalWithDrawOpen(false)
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
                            src={previewImage}
                        />
                        <Upload
                            beforeUpload={() => false}
                            showUploadList={false}
                            onChange={handleFileChange}
                            accept="image/*"
                        >
                            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                        </Upload>
                    </div>
                    <br />
                    <Form.Item
                        name="full_name"
                        label="Họ và tên"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập họ và tên',
                            },
                        ]}
                    >
                        <Input placeholder="Nhập họ và tên" />
                    </Form.Item>
                    <Form.Item name="email" label="Email">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số điện thoại',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="bio"
                        label="Giới thiệu bản thân"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập giới thiệu bản thân',
                            },
                        ]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name="experience_years"
                        label="Số năm kinh nghiệm"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số năm kinh nghiệm',
                            },
                        ]}
                    >
                        <Input disabled type="number" />
                    </Form.Item>
                    <Form.Item
                        name="linkedin_url"
                        label="Đường dẫn LinkedIn"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập đường dẫn LinkedIn',
                            },
                        ]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Số dư ví">
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
                                onClick={() => setIsModalWithDrawOpen(true)}
                            >
                                Rút tiền
                            </Button>
                        </Input.Group>
                    </Form.Item>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn ngày sinh',
                            },
                        ]}
                        name="date_of_birth"
                        label="Ngày sinh"
                    >
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label="Giới tính"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn giới tính',
                            },
                        ]}
                    >
                        <Select allowClear placeholder="Chọn giới tính">
                            <Select.Option value="male">Nam</Select.Option>
                            <Select.Option value="female">Nữ</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item hidden name="avatar">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Lưu thay đổi
                        </Button>
                        <Button
                            type="default"
                            style={{ marginLeft: 8 }}
                            onClick={() => form.resetFields()}
                        >
                            Đặt lại
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
                        label="Mật khẩu hiện tại"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu hiện tại',
                            },
                        ]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu hiện tại" />
                    </Form.Item>
                    <Form.Item
                        name="newPassword"
                        label="Mật khẩu mới"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu mới',
                            },
                        ]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu mới" />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        label="Xác nhận mật khẩu"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng xác nhận mật khẩu mới',
                            },
                        ]}
                    >
                        <Input.Password placeholder="Nhập lại mật khẩu mới" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Đổi mật khẩu
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
                        onClick={updateInstructorProfile}
                        type="link"
                    >
                        Làm mới
                    </Button>
                }
                onTabChange={onTabChange}
                tabProps={{
                    size: 'middle',
                }}
            >
                {contentListNoTitle[activeTabKey]}
            </Card>
            <InstructorWithDrawModal
                visible={isModalWithDrawOpen}
                onClose={() => {
                    // @ts-ignore
                    setIsModalWithDrawOpen(false)
                }}
                onSubmit={(values: any) => handleWithDraw(values)}
                loading={withDrawLoading}
            />
        </div>
    )
}

export default InstructorProfilePage
