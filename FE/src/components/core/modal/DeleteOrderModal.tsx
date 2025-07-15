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
            title="Delete Order"
            open={visible}
            onCancel={onClose}
            width={'30%'}
            centered
            footer={null}
        >
            <div style={{ marginBottom: 24, fontSize: 18 }}>
                Are you sure to delete order{' '}
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
                            Cancel
                        </Button>
                        <Button
                            style={{ marginLeft: 10 }}
                            key="submit"
                            color="danger"
                            variant="solid"
                            loading={loading}
                            onClick={handleSubmit}
                        >
                            Delete
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}
