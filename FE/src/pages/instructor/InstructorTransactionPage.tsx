import React, { useEffect, useState } from 'react'

import { Button, Card, Empty, Table, Typography, notification } from 'antd'

import { LogoutOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons'

import InstructorWithDrawModal from '@/components/core/modal/InstructorWithDrawModal'
import { StudentDepositModal } from '@/components/core/modal/StudentDepositModal'
import { STUDENT_MANAGE_TRANSACTION_COLUMNS } from '@/constants/table'
import PaymentService from '@/services/payment'

const { Title, Text } = Typography

const InstructorTransactionPage = () => {
    const [transactions, setTransactions] = useState<any[]>([])
    const [refreshLoading, setRefreshLoading] = useState(false)
    const [withDrawLoading, setWithDrawLoading] = useState(false)
    const [isModalWithDrawOpen, setIsModalWithDrawOpen] = useState(false)

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

    const handleWithDraw = async (values: any) => {
        setWithDrawLoading(true)
        try {
            const response = await PaymentService.withdraw({
                amount: values.amount,
                bank_account: values.bank_account,
                note: values.note,
            })
            if (response.status === 200) {
                notification.success({
                    message: 'Gửi yêu cầu rút tiền thành công',
                })
            } else if (response.status === 400) {
                notification.warning({
                    message: response.data.message,
                })
            }
        } catch (error) {
            notification.error({
                message: 'Gửi yêu cầu rút tiền thất bại',
            })
        } finally {
            setWithDrawLoading(false)
            setIsModalWithDrawOpen(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <Card style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                        <Title level={2}>Quản lý giao dịch</Title>
                        <Text type="secondary">
                            Xem lịch sử giao dịch và rút tiền khỏi hệ thống
                        </Text>
                    </div>
                    <div style={{ flexGrow: 1 }}></div>
                    <div>
                        <Button
                            type="primary"
                            size="middle"
                            icon={<LogoutOutlined />}
                            onClick={() => setIsModalWithDrawOpen(true)}
                            style={{ marginBottom: '16px' }}
                        >
                            Rút tiền
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
                    <Card style={{ marginBottom: '24px' }}>
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
            <InstructorWithDrawModal
                visible={isModalWithDrawOpen}
                onClose={() => {
                    // @ts-ignore
                    setIsModalWithDrawOpen(false)
                }}
                onSubmit={(values: any) => handleWithDraw(values)}
                loading={withDrawLoading}
            />
        </div>
    )
}

export default InstructorTransactionPage
