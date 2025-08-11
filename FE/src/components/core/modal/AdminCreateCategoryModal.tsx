import React, { useEffect } from 'react'

import { Button, Form, Input, Modal, Select } from 'antd'

import CategoryService from '@/services/category'

const AdminCreateCategoryModal = ({
    visible,
    onClose,
    onSubmit,
    loading,
}: any) => {
    const [form] = Form.useForm()
    const [categories, setCategories] = React.useState<any[]>([])

    const fetchCategories = async () => {
        try {
            const response = await CategoryService.getParentCategories()
            setCategories(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    const handleReset = () => {
        form.resetFields()
    }

    const handleCancel = () => {
        form.resetFields()
        onClose()
    }

    const handleSubmit = (values: any) => {
        onSubmit(values)
        handleCancel()
    }

    useEffect(() => {
        fetchCategories()
    }, [visible])

    return (
        <Modal
            title="Tạo danh mục khóa học"
            open={visible}
            onCancel={handleCancel}
            width="30%"
            centered
            className="course-modal"
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    label="Tên danh mục"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên danh mục',
                        },
                    ]}
                >
                    <Input allowClear placeholder="Nhập tên danh mục" />
                </Form.Item>
                <Form.Item name="parent_id" label="Danh mục cha">
                    <Select allowClear placeholder="Chọn danh mục cha">
                        {categories.length > 0 &&
                            categories.map((category: any) => (
                                <Select.Option value={category.id}>
                                    {category.name}
                                </Select.Option>
                            ))}
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
                            Tạo
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AdminCreateCategoryModal
