import { Button, Form, Input, Modal } from 'antd'
import React from 'react'

const { TextArea } = Input

const CreateLessonModal = ({ visible, onClose, onSubmit, loading }: any) => {
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
            title="Create New Lesson"
            open={visible}
            onCancel={handleCancel}
            width="30%"
            centered
            className="course-modal"
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please enter the lesson title' }]}
                >
                    <Input allowClear placeholder="Enter lesson title" />
                </Form.Item>
                <Form.Item
                    label="Video url"
                    name="video_url"
                    rules={[{ required: true, message: 'Please enter the lesson video url' }]}
                >
                    <Input allowClear placeholder="Enter lesson video url" />
                </Form.Item>
                <Form.Item
                    label="Content"
                    name="content"
                    rules={[{ required: true, message: 'Please enter a content' }]}
                >
                    <TextArea rows={4} allowClear placeholder="Enter lesson content" />
                </Form.Item>
                <Form.Item
                    label='Order number'
                    name="order_number"
                    rules={[
                        { required: true, message: 'Please enter the lesson order number' },
                        {
                            pattern: /^\d+(\.\d{1,2})?$/,
                            message: 'Please enter a valid (e.g., 1)',
                        },
                    ]}
                >
                    <Input type='number' allowClear placeholder="Enter order number (e.g., 1)" />
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
                            Create
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CreateLessonModal