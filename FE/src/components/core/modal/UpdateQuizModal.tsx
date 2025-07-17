import { Button, Form, Input, Modal } from 'antd'
import React, { useEffect } from 'react'

const { TextArea } = Input

const UpdateQuizModal = ({ visible, onClose, onSubmit, loading, record }: any) => {
    const [form] = Form.useForm()

    useEffect(() => {
        if (visible && record) {
            form.setFieldsValue({
                title: record.title,
                description: record.description,
            })
        } else {
            form.resetFields()
        }
    }, [visible, record, form])

    const handleReset = () => {
        form.setFieldsValue({
            title: record.title,
            description: record.description,
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
            title={`Edit Quiz: ${record?.title || 'Quiz'}`}
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
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please enter the quiz title' }]}
                >
                    <Input allowClear placeholder="Enter quiz title" />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please enter a description' }]}
                >
                    <TextArea rows={4} allowClear placeholder="Enter quiz description" />
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
                            Edit
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default UpdateQuizModal