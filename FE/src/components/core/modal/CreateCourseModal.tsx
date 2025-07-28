import React, { useState } from 'react'

import { Button, Form, Input, Modal, Select, Upload, notification } from 'antd'

import { UploadOutlined } from '@ant-design/icons'

const { Option } = Select
const { TextArea } = Input

const CreateCourseModal = ({
    visible,
    onClose,
    onSubmit,
    loading,
    categories,
}: any) => {
    const [form] = Form.useForm()
    const [fileList, setFileList] = useState<any>([])

    const handleReset = () => {
        form.resetFields()
        setFileList([])
    }

    const handleCancel = () => {
        form.resetFields()
        setFileList([])
        onClose()
    }

    const handleSubmit = (values: any) => {
        const submitValues = {
            ...values,
            thumbnail:
                fileList.length > 0 && fileList[0].originFileObj
                    ? fileList[0].originFileObj
                    : null,
        }
        onSubmit(submitValues)
        handleCancel()
    }

    const handleUploadChange = ({ fileList: newFileList }: any) => {
        const filteredList = newFileList.filter((file: any) => {
            const isImage = file.type.startsWith('image/')
            if (!isImage) {
                notification.error({
                    message: 'Chỉ được phép tải lên tệp hình ảnh!',
                })
            }
            return isImage
        })
        setFileList(filteredList)
    }

    return (
        <Modal
            title="Tạo khóa học"
            open={visible}
            onCancel={handleCancel}
            width="30%"
            centered
            className="course-modal"
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    label="Tiêu đề"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tiêu đề khóa học',
                        },
                    ]}
                >
                    <Input allowClear placeholder="Nhập tiêu đề khóa học" />
                </Form.Item>
                <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mô tả khóa học',
                        },
                    ]}
                >
                    <TextArea
                        rows={4}
                        allowClear
                        placeholder="Nhập mô tả khóa học"
                    />
                </Form.Item>
                <Form.Item
                    label="Giá"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập giá khóa học',
                        },
                        {
                            pattern: /^\d+(\.\d{1,2})?$/,
                            message:
                                'Vui lòng nhập giá hợp lệ (ví dụ: 199000.00)',
                        },
                    ]}
                >
                    <Input
                        allowClear
                        placeholder="Nhập giá (ví dụ: 199000.00)"
                    />
                </Form.Item>
                <Form.Item
                    label="Danh mục"
                    name="category_id"
                    rules={[
                        { required: true, message: 'Vui lòng chọn danh mục' },
                    ]}
                >
                    <Select placeholder="Chọn danh mục">
                        {categories.map((category: any) => (
                            <Option key={category.id} value={category.id}>
                                {category.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Ảnh đại diện"
                    name="thumbnail"
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
                        fileList={fileList}
                        onChange={handleUploadChange}
                        beforeUpload={() => false}
                    >
                        <Button icon={<UploadOutlined />}>
                            Tải lên ảnh minh họa
                        </Button>
                    </Upload>
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

export default CreateCourseModal
