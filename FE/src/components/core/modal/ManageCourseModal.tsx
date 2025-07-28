import React from 'react'

import { Button, Form, Input, Modal, Select, Upload } from 'antd'

import { UploadOutlined } from '@ant-design/icons'

const { Option } = Select

const ManageCourseModal = ({
    visible,
    onCancel,
    onSave,
    initialValues,
}: any) => {
    const [form] = Form.useForm()

    React.useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues)
        } else {
            form.resetFields()
        }
    }, [initialValues, form])

    const handleOk = () => {
        form.validateFields().then((values) => {
            onSave(values)
            form.resetFields()
        })
    }

    return (
        <Modal
            title={initialValues ? 'Chỉnh sửa khóa học' : 'Thêm khóa học mới'}
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
            okText={initialValues ? 'Lưu' : 'Tạo mới'}
            cancelText="Hủy"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="title"
                    label="Tiêu đề khóa học"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tiêu đề khóa học',
                        },
                    ]}
                >
                    <Input placeholder="Nhập tiêu đề khóa học" />
                </Form.Item>
                <Form.Item
                    name="category"
                    label="Danh mục"
                    rules={[
                        { required: true, message: 'Vui lòng chọn danh mục' },
                    ]}
                >
                    <Select placeholder="Chọn danh mục">
                        <Option value="Programming">Lập trình</Option>
                        <Option value="Web Development">Phát triển web</Option>
                        <Option value="Data Science">Khoa học dữ liệu</Option>
                        <Option value="Design">Thiết kế</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Mô tả"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mô tả',
                        },
                    ]}
                >
                    <Input.TextArea
                        rows={4}
                        placeholder="Nhập mô tả khóa học"
                    />
                </Form.Item>
                <Form.Item
                    name="thumbnail"
                    label="Ảnh đại diện"
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
                        beforeUpload={() => false}
                    >
                        <Button icon={<UploadOutlined />}>
                            Tải lên ảnh đại diện
                        </Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ManageCourseModal
