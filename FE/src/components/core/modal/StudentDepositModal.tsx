import React from 'react'

import { Button, Form, Input, Modal } from 'antd'

export const StudentDepositModal = ({
    visible,
    onClose,
    onSubmit,
    loading,
}: any) => {
    const [form] = Form.useForm()

    const handleSubmit = (values: any) => {
        onSubmit(values)
        onClose()
        form.resetFields()
    }

    return (
        <Modal
            title="Nạp tiền"
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
                        { required: true, message: 'Vui lòng nhập số tiền' },
                    ]}
                >
                    <Input
                        allowClear
                        placeholder="Nhập số tiền"
                        addonAfter={'VND'}
                    />
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
                            Xác nhận
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}
