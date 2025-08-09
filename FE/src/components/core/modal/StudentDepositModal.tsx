import React, { useEffect } from 'react'

import { Button, Form, Input, Modal, Typography } from 'antd'

import EventService from '@/services/event'

const { Text } = Typography

export const StudentDepositModal = ({
    visible,
    onClose,
    onSubmit,
    loading,
}: any) => {
    const [form] = Form.useForm()
    const [event, setEvent] = React.useState<any>({})

    const fetchEvent = async () => {
        try {
            const response = await EventService.getMaximumBonusPercent()
            setEvent(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (values: any) => {
        onSubmit({
            ...values,
            amount: (values.amount * (100 + event.bonus_percent)) / 100,
        })
        onClose()
        form.resetFields()
    }

    useEffect(() => {
        fetchEvent()
    }, [])

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
                    style={{ marginBottom: 0 }}
                >
                    <Input
                        allowClear
                        placeholder="Nhập số tiền"
                        addonAfter={'VND'}
                    />
                </Form.Item>
                {event && event.bonus_percent > 0 && (
                    <div style={{ marginBottom: 24 }}>
                        <Text type="secondary">
                            Chú ý: Hiện đang có khuyến mãi nạp tiền{' '}
                            {event.bonus_percent}%
                        </Text>
                    </div>
                )}
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
