import React from 'react'

import { Button, Drawer, Form, Input, Select } from 'antd'

const AdminFilterUserDrawer = ({
    visible,
    onClose,
    onSubmit,
    loading,
}: any) => {
    const [form] = Form.useForm()

    const handleFilter = (values: any) => {
        onSubmit(values)
        onClose()
    }

    const handleReset = () => {
        form.resetFields()
    }

    return (
        <Drawer
            title="Tìm kiếm người dùng"
            onClose={onClose}
            open={visible}
            size="large"
            footer={
                <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Button size="large" key="reset" onClick={handleReset}>
                        Đặt lại
                    </Button>
                    <Button
                        size="large"
                        key="submit"
                        type="primary"
                        style={{ marginLeft: 8 }}
                        loading={loading}
                        onClick={() => form.submit()}
                    >
                        Lọc
                    </Button>
                </div>
            }
        >
            <Form form={form} layout="vertical" onFinish={handleFilter}>
                <Form.Item label="Tên người dùng" name="search">
                    <Input allowClear placeholder="Nhập tên người dùng" />
                </Form.Item>
                <Form.Item name="role" label="Vai trò">
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
                <Form.Item name="status" label="Trạng thái">
                    <Select allowClear placeholder="Chọn trạng thái">
                        <Select.Option value="active">Hoạt động</Select.Option>
                        <Select.Option value="inactive">
                            Ngừng hoạt động
                        </Select.Option>
                        <Select.Option value="banned">Bị khóa</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Drawer>
    )
}

export default AdminFilterUserDrawer
