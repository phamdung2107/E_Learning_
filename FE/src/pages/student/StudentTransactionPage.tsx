import React, { useEffect, useState } from 'react'

import { Button, Card, Empty, Table, Typography, notification } from 'antd'

import { LoginOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons'

import { StudentDepositModal } from '@/components/core/modal/StudentDepositModal'
import { STUDENT_MANAGE_TRANSACTION_COLUMNS } from '@/constants/table'
import OrderService from '@/services/order'
import PaymentService from '@/services/payment'

const { Title, Text } = Typography

const StudentTransactionPage = () => {
    const [transactions, setTransactions] = useState<any[]>([])
    const [isModalDepositOpen, setIsModalDepositOpen] = useState(false)
    const [refreshLoading, setRefreshLoading] = useState(false)
    const [depositLoading, setDepositLoading] = useState(false)

    const fetchData = async () => {
        setRefreshLoading(true)
        try {
            const response = await PaymentService.getMyPayment()
            setTransactions(response.data)
        } catch (e) {
            console.error(e)
        } finally {
            setRefreshLoading(false)
        }
    }

    const handleDeposit = async (values: any) => {
        setDepositLoading(true)
        try {
            const response = await PaymentService.create({
                amount: values.amount,
            })
            if (response.status === 200) {
                notification.success({
                    message: 'Nạp tiền thành công',
                })
                window.open(
                    response.data.payment_url.original.payment_url,
                    '_blank'
                )
            }
        } catch (error) {
            console.error('Error depositing:', error)
            notification.error({
                message: 'Nạp tiền thất bại',
            })
        } finally {
            setDepositLoading(false)
            setIsModalDepositOpen(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="student-dashboard">
            <Card style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                        <Title level={2}>Quản lý giao dịch</Title>
                        <Text type="secondary">
                            Xem lịch sử giao dịch và nạp tiền vào hệ thống
                        </Text>
                    </div>
                    <div style={{ flexGrow: 1 }}></div>
                    <div>
                        <Button
                            type="primary"
                            size="middle"
                            icon={<LoginOutlined />}
                            onClick={() => setIsModalDepositOpen(true)}
                            style={{ marginBottom: '16px' }}
                        >
                            Nạp tiền
                        </Button>
                    </div>
                </div>
            </Card>
            <div className="certificates-section">
                {transactions.length === 0 ? (
                    <Card>
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description="Không có giao dịch nào"
                            style={{ padding: '40px' }}
                        />
                    </Card>
                ) : (
                    <Card
                        style={{ marginBottom: '24px' }}
                        styles={{
                            body: {
                                padding:
                                    innerWidth < 480
                                        ? '24px 5px 0 5px'
                                        : '24px',
                            },
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Button
                                variant="outlined"
                                color="primary"
                                size="middle"
                                icon={<ReloadOutlined />}
                                onClick={fetchData}
                                loading={refreshLoading}
                                style={{
                                    marginBottom: '16px',
                                    marginRight: '16px',
                                }}
                            >
                                Làm mới
                            </Button>
                        </div>
                        <Table
                            bordered
                            columns={STUDENT_MANAGE_TRANSACTION_COLUMNS}
                            dataSource={transactions}
                            loading={refreshLoading}
                            rowKey="id"
                            pagination={{ pageSize: 10 }}
                            scroll={{ x: 'max-content' }}
                        />
                    </Card>
                )}
            </div>
            <StudentDepositModal
                visible={isModalDepositOpen}
                onClose={() => {
                    // @ts-ignore
                    setIsModalDepositOpen(false)
                }}
                onSubmit={(values: any) => handleDeposit(values)}
                loading={depositLoading}
            />
        </div>
    )
}

export default StudentTransactionPage
