import React from 'react'

import { Button, Form, Modal } from 'antd'

export const CheckoutOrderModal = ({
    visible,
    onClose,
    onSubmit,
    loading,
    orders,
}: any) => {
    const handleSubmit = () => {
        onSubmit(orders)
        onClose()
    }

    return (
        <Modal
            title="Thanh toán đơn hàng"
            open={visible}
            onCancel={onClose}
            width={'30%'}
            centered
            footer={null}
        >
            <div style={{ marginBottom: 24, fontSize: 18 }}>
                Are you sure to checkout orders?
            </div>
            <Form layout="vertical" onFinish={handleSubmit}>
                <Form.Item style={{ marginBottom: 0 }}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ flexGrow: 1 }}></div>
                        <Button key="cancel" type="default" onClick={onClose}>
                            Hủy
                        </Button>
                        <Button
                            style={{ marginLeft: 10 }}
                            key="submit"
                            color="primary"
                            variant="solid"
                            loading={loading}
                            onClick={handleSubmit}
                        >
                            Thanh toán
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}
