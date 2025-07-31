import React, { useEffect } from 'react'

import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Modal,
    Select,
} from 'antd'

import dayjs from 'dayjs'

import { DATE_TIME_FORMAT } from '@/constants/date'

const AdminUpdateEventModal = ({
    visible,
    onClose,
    onSubmit,
    loading,
    record,
}: any) => {
    const [form] = Form.useForm()

    useEffect(() => {
        if (visible && record) {
            form.setFieldsValue({
                name: record.name,
                content: record.content,
                bonus_percent: record.bonus_percent,
                end_time: record.end_time ? dayjs(record.end_time) : null,
                start_time: record.start_time ? dayjs(record.start_time) : null,
                status: record.status,
            })
        } else {
            form.resetFields()
        }
    }, [visible, record, form])

    const handleReset = () => {
        form.setFieldsValue({
            name: record.name,
            content: record.content,
            bonus_percent: record.bonus_percent,
            end_time: record.end_time ? dayjs(record.end_time) : null,
            start_time: record.start_time ? dayjs(record.start_time) : null,
            status: record.status,
        })
    }

    const handleCancel = () => {
        form.resetFields()
        onClose()
    }

    const handleSubmit = (values: any) => {
        onSubmit({
            ...values,
            start_time: values.start_time.format('YYYY-MM-DD HH:mm:ss'),
            end_time: values.end_time.format('YYYY-MM-DD HH:mm:ss'),
        })
        handleCancel()
    }

    return (
        <Modal
            title={`Sửa hoạt động: ${record?.name || 'Event'}`}
            open={visible}
            onCancel={handleCancel}
            width="30%"
            centered
            className="course-modal"
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item label="Tên sự kiện" name="name">
                    <Input allowClear placeholder="Nhập tên sự kiện" />
                </Form.Item>
                <Form.Item label="Nội dung" name="content">
                    <Input.TextArea
                        allowClear
                        placeholder="Nhập nội dung sự kiện"
                        autoSize={{ minRows: 3, maxRows: 6 }}
                    />
                </Form.Item>
                <Form.Item label="Phần trăm thưởng (%)" name="bonus_percent">
                    <InputNumber
                        min={0}
                        max={100}
                        style={{ width: '100%' }}
                        placeholder="Nhập phần trăm thưởng"
                    />
                </Form.Item>
                <Form.Item label="Trạng thái" name="status">
                    <Select allowClear placeholder="Chọn trạng thái">
                        <Select.Option value={1}>Đang hoạt động</Select.Option>
                        <Select.Option value={0}>Ngừng hoạt động</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Ngày bắt đầu" name="start_time">
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
                            Sửa
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AdminUpdateEventModal
