import React, { useEffect, useMemo, useState } from 'react'

import { Button, Card, Table, Typography, notification } from 'antd'

import { ReloadOutlined } from '@ant-design/icons'

import { getManageRequestedColumns } from '@/constants/table'
import InstructorService from '@/services/instructor'

const { Title, Text } = Typography

const AdminManageRequestsPage = () => {
    const [refreshLoading, setRefreshLoading] = useState(false)
    const [requests, setRequests] = useState<any[]>([])

    const fetchData = async () => {
        setRefreshLoading(true)
        try {
            const response = await InstructorService.requestedStudents()
            setRequests(
                response.data.map((res: any) => ({
                    ...res,
                    user_full_name: res?.user?.full_name,
                    user_email: res?.user?.email,
                    user_phone: res?.user?.phone,
                    user_gender: res?.user?.gender,
                    user_date_of_birth: res?.user?.date_of_birth,
                    user_status: res?.user?.status,
                }))
            )
        } catch (e) {
            console.error(e)
        } finally {
            setRefreshLoading(false)
        }
    }

    const handleAccept = async (values: any) => {
        setRefreshLoading(true)
        try {
            const response = await InstructorService.approve(values.user.id)
            if (response.status === 200) {
                notification.success({
                    message: 'Chấp nhận thành công',
                })
                await fetchData()
            }
        } catch (e) {
            notification.error({
                message: 'Chấp nhận thất bại',
            })
        } finally {
            setRefreshLoading(false)
        }
    }

    const handleReject = async (values: any) => {
        setRefreshLoading(true)
        try {
            const response = await InstructorService.reject(values.user.id)
            if (response.status === 200) {
                notification.success({
                    message: 'Từ chối thành công',
                })
                await fetchData()
            }
        } catch (e) {
            notification.error({
                message: 'Từ chối thất bại',
            })
        } finally {
            setRefreshLoading(false)
        }
    }

    const columns: any = useMemo(() => {
        return getManageRequestedColumns(handleAccept, handleReject)
    }, [])

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="instructor-manage-courses" style={{ padding: '24px' }}>
            <Card style={{ marginBottom: '24px' }}>
                <Title level={2}>Quản lý yêu cầu trở thành giảng viên</Title>
                <Text type="secondary">Xem và thao tác với các yêu cầu</Text>
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
                    dataSource={requests}
                    loading={refreshLoading}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 'max-content' }}
                />
            </Card>
        </div>
    )
}

export default AdminManageRequestsPage
