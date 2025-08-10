import React from 'react'

import { Button, Form, Input, Modal, Rate } from 'antd'

const { TextArea } = Input

const StudentReviewCourseModal = ({
    visible,
    onClose,
    onSubmit,
    loading,
}: any) => {
    const [form] = Form.useForm()

    const handleSubmit = (values: any) => {
        onSubmit(values)
        onClose()
        form.resetFields()
    }

    return (
        <Modal
            title="Viết đánh giá khóa học"
            open={visible}
            onCancel={onClose}
            centered
            footer={null}
        >
            <Form
                form={form}
                labelAlign="left"
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Đánh giá của bạn"
                    name="comment"
                    rules={[
                        { required: true, message: 'Vui lòng nhập đánh giá' },
                    ]}
                >
                    <TextArea
                        allowClear
                        placeholder="Nhập số đánh giá về khóa học"
                    />
                </Form.Item>
                <Form.Item
                    label="Xếp hạng"
                    name="rating"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn sao xếp hạng',
                        },
                    ]}
                >
                    <Rate
                        tooltips={[
                            'Rất tệ',
                            'Dở',
                            'Bình thường',
                            'Tốt',
                            'Tuyệt vời',
                        ]}
                        allowClear
                        defaultValue={0}
                    />
                </Form.Item>
                <Form.Item style={{ marginBottom: 0 }}>
                    <div style={{ display: 'flex' }}>
                        <Button key="cancel" type="default" onClick={onClose}>
                            Hủy
                        </Button>
                        <div style={{ flexGrow: 1 }}></div>
                        <Button
                            style={{ marginLeft: 10 }}
                            key="submit"
                            type="primary"
                            loading={loading}
                            onClick={() => form.submit()}
                        >
                            Đánh giá
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default StudentReviewCourseModal
