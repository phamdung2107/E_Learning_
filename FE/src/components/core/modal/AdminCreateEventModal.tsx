import React from 'react'

import { Button, DatePicker, Form, Input, InputNumber, Modal } from 'antd'

import { DATE_TIME_FORMAT } from '@/constants/date'

const AdminCreateEventModal = ({
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
        const data = {
            ...values,
            start_time: values.start_time.format('YYYY-MM-DD HH:mm:ss'),
            end_time: values.end_time.format('YYYY-MM-DD HH:mm:ss'),
        }
        onSubmit(data)
        handleCancel()
    }

    return (
        <Modal
            title="Tạo sự kiện"
            open={visible}
            onCancel={handleCancel}
            width="30%"
            centered
            className="course-modal"
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    label="Tên sự kiện"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên sự kiện',
                        },
                    ]}
                >
                    <Input allowClear placeholder="Nhập tên sự kiện" />
                </Form.Item>
                <Form.Item
                    label="Nội dung"
                    name="content"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập nội dung',
                        },
                    ]}
                >
                    <Input.TextArea
                        allowClear
                        placeholder="Nhập nội dung sự kiện"
                        autoSize={{ minRows: 3, maxRows: 6 }}
                    />
                </Form.Item>
                <Form.Item
                    label="Phần trăm thưởng (%)"
                    name="bonus_percent"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập phần trăm thưởng',
                        },
                        {
                            type: 'number',
                            min: 0,
                            max: 100,
                            message: 'Phần trăm thưởng phải từ 0 đến 100',
                        },
                    ]}
                >
                    <InputNumber
                        min={0}
                        max={100}
                        style={{ width: '100%' }}
                        placeholder="Nhập phần trăm thưởng"
                    />
                </Form.Item>
                <Form.Item
                    label="Ngày bắt đầu"
                    name="start_time"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn ngày bắt đầu',
                        },
                    ]}
                >
                    <DatePicker
                        style={{ width: '100%' }}
                        format={DATE_TIME_FORMAT}
                        placeholder="Chọn ngày bắt đầu"
                    />
                </Form.Item>
                <Form.Item
                    label="Ngày kết thúc"
                    name="end_time"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn ngày kết thúc',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                const start = getFieldValue('start_date')
                                if (!value || !start || value.isAfter(start)) {
                                    return Promise.resolve()
                                }
                                return Promise.reject(
                                    new Error(
                                        'Ngày kết thúc phải sau ngày bắt đầu'
                                    )
                                )
                            },
                        }),
                    ]}
                >
                    <DatePicker
                        style={{ width: '100%' }}
                        format={DATE_TIME_FORMAT}
                        placeholder="Chọn ngày kết thúc"
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
                            Tạo
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AdminCreateEventModal
