import React from 'react'

import { Button, Form, Input, Modal } from 'antd'

const { TextArea } = Input

const RequestInstructorModal = ({
    visible,
    onClose,
    onSubmit,
    loading,
}: any) => {
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
            title="Request Instructor"
            open={visible}
            onCancel={handleCancel}
            width={'30%'}
            centered
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    label="Bio"
                    name="bio"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your bio',
                        },
                    ]}
                >
                    <TextArea
                        rows={4}
                        allowClear
                        placeholder="Enter your bio"
                    />
                </Form.Item>
                <Form.Item
                    label="Experience years"
                    name="experience_years"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter experience years',
                        },
                    ]}
                >
                    <Input
                        type="number"
                        allowClear
                        placeholder="Enter experience years"
                    />
                </Form.Item>
                <Form.Item
                    label="LinkedIn Url"
                    name="linkedin_url"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter linkedin url',
                        },
                    ]}
                >
                    <Input
                        type="link"
                        allowClear
                        placeholder="Enter linkedin url"
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
                            Request
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default RequestInstructorModal
