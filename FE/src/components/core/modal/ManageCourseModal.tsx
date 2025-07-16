import React from 'react'
import { Button, Form, Input, Modal, Select, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const { Option } = Select

const ManageCourseModal = ({ visible, onCancel, onSave, initialValues }: any) => {
    const [form] = Form.useForm()

    // Đặt giá trị ban đầu cho form khi chỉnh sửa
    React.useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues)
        } else {
            form.resetFields()
        }
    }, [initialValues, form])

    // Xử lý khi submit form
    const handleOk = () => {
        form.validateFields().then((values) => {
            onSave(values)
            form.resetFields()
        })
    }

    return (
        <Modal
            title={initialValues ? 'Edit Course' : 'Add New Course'}
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
            okText={initialValues ? 'Save' : 'Create'}
            cancelText="Cancel"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="title"
                    label="Course Title"
                    rules={[{ required: true, message: 'Please enter the course title' }]}
                >
                    <Input placeholder="Enter course title" />
                </Form.Item>
                <Form.Item
                    name="category"
                    label="Category"
                    rules={[{ required: true, message: 'Please select a category' }]}
                >
                    <Select placeholder="Select a category">
                        <Option value="Programming">Programming</Option>
                        <Option value="Web Development">Web Development</Option>
                        <Option value="Data Science">Data Science</Option>
                        <Option value="Design">Design</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Please enter a description' }]}
                >
                    <Input.TextArea rows={4} placeholder="Enter course description" />
                </Form.Item>
                <Form.Item
                    name="thumbnail"
                    label="Thumbnail"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => {
                        if (Array.isArray(e)) {
                            return e
                        }
                        return e && e.fileList
                    }}
                >
                    <Upload
                        name="thumbnail"
                        listType="picture"
                        maxCount={1}
                        beforeUpload={() => false} // Ngăn upload tự động
                    >
                        <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ManageCourseModal