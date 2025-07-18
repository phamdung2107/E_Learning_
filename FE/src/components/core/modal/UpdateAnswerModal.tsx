import React, { useEffect } from 'react'

import { Button, Checkbox, Form, Input, Modal, Select } from 'antd'

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
                answer_text: record.answer_text,
                is_correct: record.is_correct,
            })
        } else {
            form.resetFields()
        }
    }, [visible, record, form])

    const handleReset = () => {
        form.setFieldsValue({
            answer_text: record.answer_text,
            is_correct: record.is_correct,
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
            title={`Edit Answer: ${record?.answer_text || 'Quiz'}`}
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
                    label="Answer text"
                    name="answer_text"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter the quiz answer text',
                        },
                    ]}
                >
                    <Input allowClear placeholder="Enter quiz answer text" />
                </Form.Item>
                <Form.Item
                    label="Is correct"
                    name="is_correct"
                    valuePropName="checked"
                >
                    <Checkbox>Correct</Checkbox>
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
