import React, { useEffect } from 'react'

import { Button, Checkbox, Form, Input, Modal, Select } from 'antd'

const AdminUpdateUserModal = ({
    visible,
    onClose,
    onSubmit,
    loading,
    record,
}: any) => {
    const [form] = Form.useForm()

    useEffect(() => {
        if (visible && record) {
            form.setFieldsValue({
                full_name: record.full_name,
                email: record.email,
                phone: record.phone,
                gender: record.gender,
                date_of_birth: record.date_of_birth,
                role: record.role,
            })
        } else {
            form.resetFields()
        }
    }, [visible, record, form])

    const handleReset = () => {
        form.setFieldsValue({
            full_name: record.full_name,
            email: record.email,
            phone: record.phone,
            gender: record.gender,
            date_of_birth: record.date_of_birth,
            role: record.role,
        })
    }

    const handleCancel = () => {
        form.resetFields()
        onClose()
    }

    const handleSubmit = (values: any) => {
        onSubmit(values)
        handleCancel()
    }

    return (
        <Modal
            title={`Sửa người dùng: ${record?.full_name || 'User'}`}
            open={visible}
            onCancel={handleCancel}
            width="30%"
            centered
            className="course-modal"
            footer={null}
        >
            <Form
                form={form}
                labelAlign="left"
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Họ và tên"
                    name="full_name"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập họ và tên',
                        },
                    ]}
                >
                    <Input allowClear placeholder="Nhập họ và tên" />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập email',
                        },
                    ]}
                >
                    <Input disabled allowClear placeholder="Nhập email" />
                </Form.Item>
                <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập số điện thoại',
                        },
                    ]}
                >
                    <Input allowClear placeholder="Nhập số điện thoại" />
                </Form.Item>
                <Form.Item
                    name="role"
                    label="Vai trò"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn vai trò',
                        },
                    ]}
                >
                    <Select allowClear placeholder="Chọn vai trò">
                        <Select.Option value="admin">
                            Quản trị viên
                        </Select.Option>
                        <Select.Option value="instructor">
                            Giảng viên
                        </Select.Option>
                        <Select.Option value="student">Người học</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="date_of_birth" label="Ngày sinh">
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
                <Form.Item style={{ marginBottom: 0 }}>
                    <div style={{ display: 'flex' }}>
                        <Button
                            key="reset"
                            type="default"
                            onClick={handleReset}
                        >
                            Đặt lại
                        </Button>
                        <div style={{ flexGrow: 1 }}></div>
                        <Button
                            key="cancel"
                            type="default"
                            onClick={handleCancel}
                        >
                            Hủy
                        </Button>
                        <Button
                            style={{ marginLeft: 10 }}
                            key="submit"
                            type="primary"
                            loading={loading}
                            onClick={() => form.submit()}
                        >
                            Cập nhật
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AdminUpdateUserModal
