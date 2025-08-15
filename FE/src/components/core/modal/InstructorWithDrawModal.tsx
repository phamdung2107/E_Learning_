import React from 'react'

import { Button, Form, Input, Modal, Typography } from 'antd'

const { Text } = Typography

const InstructorWithDrawModal = ({
    visible,
    onClose,
    onSubmit,
    loading,
}: any) => {
    const [form] = Form.useForm()

    const handleSubmit = (values: any) => {
        onSubmit({
            ...values,
            amount: values.amount * 0.9,
        })
        onClose()
        form.resetFields()
    }

    return (
        <Modal
            title="Rút tiền"
            open={visible}
            onCancel={onClose}
            centered
            footer={null}
        >
            <Form
                form={form}
                labelAlign="left"
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Số tiền"
                    name="amount"
                    rules={[
                        { required: true, message: 'Nhập số tiền cần rút' },
                    ]}
                    style={{ marginBottom: 0 }}
                >
                    <Input
                        allowClear
                        placeholder="Nhập số tiền"
                        addonAfter={'VND'}
                    />
                </Form.Item>
                <div style={{ marginBottom: 24 }}>
                    <Text type="secondary">Lưu ý: Phí rút tiền là 10%</Text>
                </div>
                <Form.Item
                    label="Tài khoản ngân hàng"
                    name="bank_account"
                    rules={[
                        { required: true, message: 'Nhập tài khoản ngân hàng' },
                    ]}
                >
                    <Input allowClear placeholder="Ví dụ: vcb-1018672171" />
                </Form.Item>
                <Form.Item
                    label="Chú thích"
                    name="note"
                    rules={[{ required: true, message: 'Nhập chú thích' }]}
                >
                    <Input.TextArea allowClear placeholder="Nhập chú thích" />
                </Form.Item>
                <Form.Item style={{ marginBottom: 0 }}>
                    <div style={{ display: 'flex' }}>
                        <Button key="cancel" type="default" onClick={onClose}>
                            Hủy
                        </Button>
                        <div style={{ flexGrow: 1 }}></div>
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

export default InstructorWithDrawModal
