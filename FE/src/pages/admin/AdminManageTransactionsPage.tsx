import React, { useEffect } from 'react'

import { Button, Card, Spin, Table, Typography } from 'antd'

import { ReloadOutlined } from '@ant-design/icons'

import { MANAGE_TRANSACTION_COLUMNS } from '@/constants/table'
import OrderService from '@/services/order'

const { Title, Text } = Typography

const AdminManageTransactionsPage = () => {
    const [refreshLoading, setRefreshLoading] = React.useState(false)
    const [transactions, setTransactions] = React.useState<any[]>([])

    const fetchData = async () => {
        setRefreshLoading(true)
        try {
            const response = await OrderService.getMyOrders()
            setTransactions(response.data)
        } catch (e) {
            console.error(e)
        } finally {
            setRefreshLoading(false)
        }
    }

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
                        Refresh
                    </Button>
                </div>
                <Table
                    bordered
                    columns={MANAGE_TRANSACTION_COLUMNS}
                    dataSource={transactions}
                    loading={refreshLoading}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
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
