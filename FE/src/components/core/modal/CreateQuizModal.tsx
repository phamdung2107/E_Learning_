import React from 'react'

import { Button, Form, Input, Modal } from 'antd'

const { TextArea } = Input

const CreateQuizModal = ({ visible, onClose, onSubmit, loading }: any) => {
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
            title="Create New Quiz"
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
                            message: 'Please enter the quiz title',
                        },
                    ]}
                >
                    <Input allowClear placeholder="Enter quiz title" />
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
                        placeholder="Enter quiz description"
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

export default CreateQuizModal
