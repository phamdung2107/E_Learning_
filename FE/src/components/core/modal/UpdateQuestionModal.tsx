import React, { useEffect } from 'react'

import { Button, Form, Input, Modal, Select } from 'antd'

const UpdateQuizModal = ({
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
                question_text: record.question_text,
                question_type: record.question_type,
                order_number: record.order_number,
            })
        } else {
            form.resetFields()
        }
    }, [visible, record, form])

    const handleReset = () => {
        form.setFieldsValue({
            question_text: record.question_text,
            question_type: record.question_type,
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
            title={`Edit Question: ${record?.question_text || 'Quiz'}`}
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
                    label="Question text"
                    name="question_text"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter the quiz question text',
                        },
                    ]}
                >
                    <Input allowClear placeholder="Enter quiz question text" />
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
                            Edit
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default UpdateQuizModal
