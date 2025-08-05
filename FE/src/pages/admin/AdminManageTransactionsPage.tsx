import React, { useEffect, useMemo } from 'react'

import { Button, Card, Spin, Table, Typography, notification } from 'antd'

import { ReloadOutlined } from '@ant-design/icons'

import {
    MANAGE_TRANSACTION_COLUMNS,
    getManageCourseColumns,
    getManageTransactionColumns,
} from '@/constants/table'
import PaymentService from '@/services/payment'

const { Title, Text } = Typography

const AdminManageTransactionsPage = () => {
    const [refreshLoading, setRefreshLoading] = React.useState(false)
    const [transactions, setTransactions] = React.useState<any[]>([])

    const fetchData = async () => {
        setRefreshLoading(true)
        try {
            const response = await PaymentService.getAll()
            setTransactions(
                response.data.map((res: any) => ({
                    ...res,
                    user_email: res?.user?.email,
                }))
            )
        } catch (e) {
            console.error(e)
        } finally {
            setRefreshLoading(false)
        }
    }

    const handleAccept = async (values: any) => {
        try {
            const response = await PaymentService.approve(values.id)
            if (response.status === 200) {
                notification.success({
                    message: 'Đã cho chép giảng viên rút tiền',
                })
            }
        } catch (e) {
            notification.error({
                message: 'Cho phép giảng viên rút tiền bị lỗi',
            })
        }
    }

    const handleReject = async (values: any) => {
        try {
            const response = await PaymentService.reject(values.id)
            if (response.status === 200) {
                notification.success({
                    message: 'Từ chối giảng viên rút tiền thành công',
                })
            }
        } catch (e) {
            notification.error({
                message: 'Từ chối giảng viên rút tiền thất bại',
            })
        }
    }

    const columns: any = useMemo(() => {
        return getManageTransactionColumns(handleAccept, handleReject)
    }, [])

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="instructor-manage-courses" style={{ padding: '24px' }}>
            <Card style={{ marginBottom: '24px' }}>
                <Title level={2}>Quản lý giao dịch</Title>
                <Text type="secondary">
                    Xem đơn hàng, trang thái thanh toán
                </Text>
            </Card>
            <Card style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="middle"
                        icon={<ReloadOutlined />}
                        onClick={fetchData}
                        loading={refreshLoading}
                        style={{ marginBottom: '16px', marginRight: '16px' }}
                    >
                        Làm mới
                    </Button>
                </div>
                <Table
                    bordered
                    columns={columns}
                    dataSource={transactions}
                    loading={refreshLoading}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 'max-content' }}
                />
            </Card>
            {refreshLoading && (
                <div className="full-page-loading">
                    <Spin fullscreen={true} size="large" tip="Đang tải..." />
                </div>
            )}
        </div>
    )
}

export default AdminManageTransactionsPage
