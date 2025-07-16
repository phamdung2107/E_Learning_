import React, { useEffect } from 'react'
import { Button, Form, Input, Modal, Select } from 'antd'

const { Option } = Select
const { TextArea } = Input

const UpdateCourseModal = ({ visible, onClose, onSubmit, loading, record, categories }: any) => {
    const [form] = Form.useForm()

    useEffect(() => {
        if (visible && record) {
            form.setFieldsValue({
                title: record.title,
                description: record.description,
                price: record.price,
                category_id: record.category_id,
                status: record.status,
            })
        } else {
            form.resetFields()
        }
    }, [visible, record, form])

    const handleReset = () => {
        form.setFieldsValue({
            title: record?.title,
            description: record?.description,
            price: record?.price,
            category_id: record?.category_id,
            status: record?.status,
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
            title={`Edit Course: ${record?.title || 'Course'}`}
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
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please enter the course title' }]}
                >
                    <Input allowClear placeholder="Enter course title" />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please enter a description' }]}
                >
                    <TextArea rows={4} allowClear placeholder="Enter course description" />
                </Form.Item>
                <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                        { required: true, message: 'Please enter the course price' },
                        {
                            pattern: /^\d+(\.\d{1,2})?$/,
                            message: 'Please enter a valid price (e.g., 299000.00)',
                        },
                    ]}
                >
                    <Input allowClear placeholder="Enter price (e.g., 299000.00)" addonAfter={'VND'} />
                </Form.Item>
                <Form.Item
                    label="Category"
                    name="category_id"
                    rules={[{ required: true, message: 'Please select a category' }]}
                >
                    <Select placeholder="Select a category">
                        {categories.map((category: any) => (
                            <Option key={category.id} value={category.id}>
                                {category.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Status"
                    name="status"
                    rules={[{ required: true, message: 'Please select a status' }]}
                >
                    <Select disabled placeholder="Select status">
                        <Option value="published">Published</Option>
                        <Option value="archived">Archived</Option>
                        <Option value="draft">Draft</Option>
                    </Select>
                </Form.Item>
                <Form.Item style={{ marginBottom: 0 }}>
                    <div style={{ display: 'flex' }}>
                        <Button key="reset" type="default" onClick={handleReset}>
                            Reset
                        </Button>
                        <div style={{ flexGrow: 1 }}></div>
                        <Button key="cancel" type="default" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button
                            style={{ marginLeft: 10 }}
                            key="submit"
                            type="primary"
                            loading={loading}
                            onClick={() => form.submit()}
                        >
                            Edit
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default UpdateCourseModal