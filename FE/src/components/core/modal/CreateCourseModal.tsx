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
                    message: 'You can only upload image files!',
                })
            }
            return isImage
        })
        setFileList(filteredList)
    }

    return (
        <Modal
            title="Create New Course"
            open={visible}
            onCancel={handleCancel}
            width="30%"
            centered
            className="course-modal"
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter the course title',
                        },
                    ]}
                >
                    <Input allowClear placeholder="Enter course title" />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter a description',
                        },
                    ]}
                >
                    <TextArea
                        rows={4}
                        allowClear
                        placeholder="Enter course description"
                    />
                </Form.Item>
                <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter the course price',
                        },
                        {
                            pattern: /^\d+(\.\d{1,2})?$/,
                            message:
                                'Please enter a valid price (e.g., 199000.00)',
                        },
                    ]}
                >
                    <Input
                        allowClear
                        placeholder="Enter price (e.g., 199000.00)"
                    />
                </Form.Item>
                <Form.Item
                    label="Category"
                    name="category_id"
                    rules={[
                        { required: true, message: 'Please select a category' },
                    ]}
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
                    label="Thumbnail"
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
                        beforeUpload={() => false} // Ngăn upload tự động
                    >
                        <Button icon={<UploadOutlined />}>
                            Upload Thumbnail
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
                            Reset
                        </Button>
                        <div style={{ flexGrow: 1 }}></div>
                        <Button
                            key="cancel"
                            type="default"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            style={{ marginLeft: 10 }}
                            key="submit"
                            type="primary"
                            loading={loading}
                            onClick={() => form.submit()}
                        >
                            Create
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CreateCourseModal
