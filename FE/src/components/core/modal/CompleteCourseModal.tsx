import React from 'react'

import { Button, Form, Modal } from 'antd'

import { CheckCircleTwoTone, TrophyOutlined } from '@ant-design/icons'

const CompleteCourseModal = ({ visible, onClose, onSubmit, loading }: any) => {
    const [form] = Form.useForm()

    const handleSubmit = () => {
        onSubmit()
        onClose()
        form.resetFields()
    }

    return (
        <Modal
            title={null}
            open={visible}
            onCancel={onClose}
            centered
            footer={null}
            width={500}
        >
            <div style={{ textAlign: 'center', padding: '20px 10px' }}>
                <TrophyOutlined style={{ fontSize: 64, color: '#faad14' }} />
                <h2 style={{ marginTop: 16, fontWeight: 'bold' }}>
                    Chúc mừng bạn đã hoàn thành khóa học! 🎉
                </h2>
                <p style={{ color: '#595959', fontSize: 16 }}>
                    Bạn đã nỗ lực và hoàn thành toàn bộ nội dung khóa học. Hãy
                    tiếp tục học tập và chinh phục những mục tiêu mới!
                </p>
                <Form
                    form={form}
                    layout="vertical"
                    style={{ marginTop: 24 }}
                    onFinish={handleSubmit}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 8,
                        }}
                    >
                        <Button onClick={onClose}>Đóng</Button>
                        <Button
                            type="primary"
                            loading={loading}
                            onClick={() => form.submit()}
                        >
                            Lấy chứng chỉ
                        </Button>
                    </div>
                </Form>
            </div>
        </Modal>
    )
}

export default CompleteCourseModal
