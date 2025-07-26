import React from 'react'

import { Button, Drawer, Form, Input, Select } from 'antd'

const AdminFilterUserDrawer = ({
    visible,
    onClose,
    onSubmit,
    loading,
    categories,
    instructors,
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
            title="Tìm kiếm khóa học"
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
                <Form.Item label="Tiêu đề" name="search">
                    <Input allowClear placeholder="Nhập tiêu đề" />
                </Form.Item>
                <Form.Item name="category_id" label="Thể loại">
                    <Select allowClear placeholder="Chọn thể loại">
                        {categories.map((category: any) => (
                            <Select.Option value={category.id}>
                                {category.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="instructor_id" label="Giảng viên">
                    <Select allowClear placeholder="Chọn giảng viên">
                        {instructors.map((instructor: any) => (
                            <Select.Option value={instructor.id}>
                                {instructor.full_name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Drawer>
    )
}

export default AdminFilterUserDrawer
