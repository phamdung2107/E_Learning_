import React from 'react'

import { Button, Checkbox, Form, Input, Modal, Select } from 'antd'

const { TextArea } = Input

const CreateAnswerModal = ({ visible, onClose, onSubmit, loading }: any) => {
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
            title="Create Answer"
            open={visible}
            onCancel={handleCancel}
            width="30%"
            centered
            className="course-modal"
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    label="Answer text"
                    name="answer_text"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter a answer text',
                        },
                    ]}
                >
                    <TextArea
                        rows={4}
                        allowClear
                        placeholder="Enter lesson answer text"
                    />
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
                            Create
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CreateAnswerModal
