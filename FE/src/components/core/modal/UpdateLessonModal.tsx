import React, { useEffect } from 'react'

import { Button, Form, Input, Modal } from 'antd'

const { TextArea } = Input

const UpdateLessonModal = ({
    visible,
    onClose,
    onSubmit,
    loading,
    record,
}: any) => {
    const [form] = Form.useForm()

    useEffect(() => {
        if (visible && record) {
            form.setFieldsValue({
                title: record.title,
                video_url: record.video_url,
                content: record.content,
                order_number: record.order_number,
            })
        } else {
            form.resetFields()
        }
    }, [visible, record, form])

    const handleReset = () => {
        form.setFieldsValue({
            title: record.title,
            video_url: record.video_url,
            content: record.content,
            order_number: record.order_number,
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
            title={`Chỉnh sửa bài học: ${record?.title || 'Bài học'}`}
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
                            message: 'Vui lòng nhập tiêu đề bài học',
                        },
                    ]}
                >
                    <Input allowClear placeholder="Nhập tiêu đề bài học" />
                </Form.Item>
                <Form.Item
                    label="Đường dẫn video"
                    name="video_url"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập đường dẫn video bài học',
                        },
                    ]}
                >
                    <Input
                        allowClear
                        placeholder="Nhập đường dẫn video bài học"
                    />
                </Form.Item>
                <Form.Item
                    label="Nội dung"
                    name="content"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập nội dung bài học',
                        },
                    ]}
                >
                    <TextArea
                        rows={4}
                        allowClear
                        placeholder="Nhập nội dung bài học"
                    />
                </Form.Item>
                <Form.Item
                    label="Thứ tự"
                    name="order_number"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập số thứ tự bài học',
                        },
                        {
                            pattern: /^\d+(\.\d{1,2})?$/,
                            message: 'Vui lòng nhập số hợp lệ (ví dụ: 1)',
                        },
                    ]}
                >
                    <Input
                        type="number"
                        allowClear
                        placeholder="Nhập số thứ tự (ví dụ: 1)"
                    />
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

export default UpdateLessonModal
