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
            title="Create New Question"
            open={visible}
            onCancel={handleCancel}
            width="30%"
            centered
            className="course-modal"
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    label="Question text"
                    name="question_text"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter a question text',
                        },
                    ]}
                >
                    <TextArea
                        rows={4}
                        allowClear
                        placeholder="Enter lesson question text"
                    />
                </Form.Item>
                <Form.Item
                    label="Question type"
                    name="question_type"
                    rules={[
                        {
                            required: true,
                            message: 'Please select a question type',
                        },
                    ]}
                >
                    <Select allowClear placeholder="Select question type">
                        <Select.Option value="single">
                            Single choice
                        </Select.Option>
                        <Select.Option value="multiple">
                            Multiple choice
                        </Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Order number"
                    name="order_number"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter the lesson order number',
                        },
                        {
                            pattern: /^\d+(\.\d{1,2})?$/,
                            message: 'Please enter a valid (e.g., 1)',
                        },
                    ]}
                >
                    <Input
                        type="number"
                        allowClear
                        placeholder="Enter order number (e.g., 1)"
                    />
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

export default CreateQuestionModal
