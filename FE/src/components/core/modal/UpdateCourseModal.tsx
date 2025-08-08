import React, { useEffect, useState } from 'react'

import {
    Button,
    Form,
    Input,
    Modal,
    Select,
    TreeSelect,
    Upload,
    notification,
} from 'antd'

import { UploadOutlined } from '@ant-design/icons'
import { Editor } from '@tinymce/tinymce-react'

const { Option } = Select
const { TextArea } = Input

const UpdateCourseModal = ({
    visible,
    onClose,
    onSubmit,
    loading,
    record,
    categories,
}: any) => {
    const [form] = Form.useForm()
    const [fileList, setFileList] = useState<any>([])

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
                              url: record.thumbnail,
                          },
                      ]
                    : [],
            })
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
                    : []
            )
        } else {
            form.resetFields()
            setFileList([])
        }
    }, [visible, record, form])

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
        })
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
                : []
        )
    }

    const handleCancel = () => {
        form.resetFields()
        setFileList([])
        onClose()
    }

    const handleSubmit = (values: any) => {
        const submitValues = {
            ...values,
            description: values.description?.level?.content
                ? values.description.level.content
                : values.description,
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
            destroyOnHidden
            title={`Chỉnh sửa khóa học: ${record?.title || 'Khóa học'}`}
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
                    <Editor
                        // @ts-ignore
                        apiKey={import.meta.env.VITE_TINY_API_KEY}
                        value={form.getFieldValue('description') || ''}
                        init={{
                            height: 300,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount',
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help',
                            placeholder: 'Nhập mô tả khóa học',
                        }}
                        onEditorChange={(content) => {
                            form.setFieldsValue({ description: content })
                        }}
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
                                'Vui lòng nhập giá hợp lệ (ví dụ: 599000.00)',
                        },
                    ]}
                >
                    <Input
                        allowClear
                        placeholder="Nhập giá (ví dụ: 599000.00)"
                        addonAfter="VND"
                    />
                </Form.Item>
                <Form.Item
                    label="Danh mục"
                    name="category_id"
                    rules={[
                        { required: true, message: 'Vui lòng chọn danh mục' },
                    ]}
                >
                    <TreeSelect
                        placeholder="Chọn danh mục"
                        allowClear
                        showSearch
                        treeDefaultExpandAll
                        treeData={categories}
                        style={{ width: '100%' }}
                    />
                </Form.Item>
                <Form.Item
                    label="Trạng thái"
                    name="status"
                    rules={[
                        { required: true, message: 'Vui lòng chọn trạng thái' },
                    ]}
                >
                    <Select placeholder="Chọn trạng thái">
                        <Option value="published">Đã xuất bản</Option>
                        <Option value="archived">Đã lưu trữ</Option>
                        <Option value="draft">Bản nháp</Option>
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
                            Tải lên ảnh đại diện
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
                            Lưu thay đổi
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default UpdateCourseModal
