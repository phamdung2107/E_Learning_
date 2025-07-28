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
            title="Yêu cầu trở thành giảng viên"
            open={visible}
            onCancel={handleCancel}
            width={'30%'}
            centered
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    label="Giới thiệu bản thân"
                    name="bio"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập giới thiệu bản thân',
                        },
                    ]}
                >
                    <TextArea
                        rows={4}
                        allowClear
                        placeholder="Nhập giới thiệu bản thân"
                    />
                </Form.Item>
                <Form.Item
                    label="Số năm kinh nghiệm"
                    name="experience_years"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập số năm kinh nghiệm',
                        },
                    ]}
                >
                    <Input
                        type="number"
                        allowClear
                        placeholder="Nhập số năm kinh nghiệm"
                    />
                </Form.Item>
                <Form.Item
                    label="Đường dẫn LinkedIn"
                    name="linkedin_url"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập đường dẫn LinkedIn',
                        },
                    ]}
                >
                    <Input
                        type="link"
                        allowClear
                        placeholder="Nhập đường dẫn LinkedIn"
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
                            Gửi yêu cầu
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default RequestInstructorModal
