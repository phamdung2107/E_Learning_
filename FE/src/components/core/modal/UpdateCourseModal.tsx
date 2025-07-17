import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, notification, Select, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const { Option } = Select
const { TextArea } = Input

const UpdateCourseModal = ({ visible, onClose, onSubmit, loading, record, categories }: any) => {
    const [form] = Form.useForm()
    const [fileList, setFileList] = useState<any>([])

    // Cập nhật form khi visible hoặc record thay đổi
    useEffect(() => {
        if (visible && record) {
            form.setFieldsValue({
                title: record.title,
                description: record.description,
                price: record.price,
                category_id: record.category_id,
                status: record.status,
                thumbnail: record.thumbnail
                    ? [
                        {
                            uid: '-1',
                            name: record.thumbnail,
                            status: 'done',
                            url: record.thumbnail, // Giả sử thumbnail là tên file, có thể cần thêm base URL nếu backend yêu cầu
                        },
                    ]
                    : [],
            });
            setFileList(
                record.thumbnail
                    ? [
                        {
                            uid: '-1',
                            name: record.thumbnail,
                            status: 'done',
                            url: record.thumbnail,
                        },
                    ]
                    : [],
            )
        } else {
            form.resetFields()
            setFileList([])
        }
    }, [visible, record, form]);

    // Xử lý reset form về giá trị ban đầu
    const handleReset = () => {
        form.setFieldsValue({
            title: record?.title,
            description: record?.description,
            price: record?.price,
            category_id: record?.category_id,
            status: record?.status,
            thumbnail: record?.thumbnail
                ? [
                    {
                        uid: '-1',
                        name: record.thumbnail,
                        status: 'done',
                        url: record.thumbnail,
                    },
                ]
                : [],
        });
        setFileList(
            record?.thumbnail
                ? [
                    {
                        uid: '-1',
                        name: record.thumbnail,
                        status: 'done',
                        url: record.thumbnail,
                    },
                ]
                : [],
        )
    };

    // Xử lý khi hủy
    const handleCancel = () => {
        form.resetFields()
        setFileList([])
        onClose()
    };

    // Xử lý khi submit
    const handleSubmit = (values: any) => {
        console.log(fileList)
        const submitValues = {
            ...values,
            thumbnail: fileList.length > 0 && fileList[0].originFileObj ? fileList[0].originFileObj : null,
        }
        onSubmit(submitValues)
        handleCancel()
    }

    // Xử lý upload file
    const handleUploadChange = ({ fileList: newFileList }: any) => {
        // Chỉ cho phép upload file ảnh
        const filteredList = newFileList.filter((file: any) => {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
                notification.error({ message: 'You can only upload image files!' });
            }
            return isImage;
        });
        setFileList(filteredList);
    };

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
                            message: 'Please enter a valid price (e.g., 599000.00)',
                        },
                    ]}
                >
                    <Input allowClear placeholder="Enter price (e.g., 599000.00)" addonAfter="VND" />
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
                    <Select placeholder="Select status">
                        <Option value="published">Published</Option>
                        <Option value="archived">Archived</Option>
                        <Option value="draft">Draft</Option>
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
                        <Button icon={<UploadOutlined />}>Upload Thumbnail</Button>
                    </Upload>
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
    );
};

export default UpdateCourseModal