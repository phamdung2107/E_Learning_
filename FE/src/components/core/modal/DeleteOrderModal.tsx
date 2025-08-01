import React from 'react'

import { Button, Form, Modal, Typography } from 'antd'

export const DeleteOrderModal = ({
    visible,
    onClose,
    onSubmit,
    loading,
    record,
}: any) => {
    const handleSubmit = () => {
        onSubmit(record)
        onClose()
    }

    return (
        <Modal
            title="Xóa đơn hàng"
            open={visible}
            onCancel={onClose}
            width={'30%'}
            centered
            footer={null}
        >
            <div style={{ marginBottom: 24, fontSize: 18 }}>
                Bạn có chắc chắn muốn xóa đơn hàng{' '}
                <Typography.Text style={{ fontSize: 18 }} type="danger">
                    {record?.id}
                </Typography.Text>
                ?
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
                            color="danger"
                            variant="solid"
                            loading={loading}
                            onClick={handleSubmit}
                        >
                            Xóa
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}
