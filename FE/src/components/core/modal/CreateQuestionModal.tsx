import React from 'react'

import { Button, Form, Input, Modal, Select } from 'antd'

const { TextArea } = Input

const CreateQuestionModal = ({ visible, onClose, onSubmit, loading }: any) => {
    const [form] = Form.useForm()

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

    return (
        <Modal
            title="Tạo câu hỏi mới"
            open={visible}
            onCancel={handleCancel}
            width="30%"
            centered
            className="course-modal"
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    label="Nội dung câu hỏi"
                    name="question_text"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập nội dung câu hỏi',
                        },
                    ]}
                >
                    <TextArea
                        rows={4}
                        allowClear
                        placeholder="Nhập nội dung câu hỏi"
                    />
                </Form.Item>
                <Form.Item
                    label="Loại câu hỏi"
                    name="question_type"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn loại câu hỏi',
                        },
                    ]}
                >
                    <Select allowClear placeholder="Chọn loại câu hỏi">
                        <Select.Option value="single">Một đáp án</Select.Option>
                        <Select.Option value="multiple">
                            Nhiều đáp án
                        </Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Thứ tự"
                    name="order_number"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập số thứ tự câu hỏi',
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
                            Tạo
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CreateQuestionModal
