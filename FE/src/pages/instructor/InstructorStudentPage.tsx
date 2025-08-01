import React, { useEffect, useState } from 'react'

import { Button, Card, Table, Typography } from 'antd'

import { ReloadOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'

import { MANAGE_STUDENT_COLUMNS } from '@/constants/table'
import InstructorService from '@/services/instructor'

const { Title, Text } = Typography

const InstructorStudentPage = () => {
    const user = useSelector((store: any) => store.auth.user)

    const [refreshLoading, setRefreshLoading] = useState(false)
    const [students, setStudents] = useState<any[]>([])

    const fetchData = async () => {
        setRefreshLoading(true)
        try {
            const response = await InstructorService.getStudents(user?.id)
            setStudents(response.data)
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
                <Title level={2}>Quản lý học viên</Title>
                <Text type="secondary">Xem và thao tác với học viên</Text>
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
                    columns={MANAGE_STUDENT_COLUMNS}
                    dataSource={students}
                    loading={refreshLoading}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 'max-content' }}
                />
            </Card>
        </div>
    )
}

export default InstructorStudentPage
