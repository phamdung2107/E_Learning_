import React, { useEffect, useMemo } from 'react'

import {
    Button,
    Card,
    Input,
    Spin,
    Table,
    Typography,
    notification,
} from 'antd'

import { PlusOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons'

import AdminCreateEventModal from '@/components/core/modal/AdminCreateEventModal'
import AdminUpdateEventModal from '@/components/core/modal/AdminUpdateEventModal'
import {
    MANAGE_TRANSACTION_COLUMNS,
    getManageEventColumns,
} from '@/constants/table'
import EventService from '@/services/event'

const { Search } = Input

const { Title, Text } = Typography

const AdminManageEventsPage = () => {
    const [refreshLoading, setRefreshLoading] = React.useState(false)
    const [events, setEvents] = React.useState<any[]>([])
    const [record, setRecord] = React.useState<any>(null)
    const [isModalCreateOpen, setIsModalCreateOpen] = React.useState(false)
    const [isModalUpdateOpen, setIsModalUpdateOpen] = React.useState(false)
    const [createLoading, setCreateLoading] = React.useState(false)
    const [updateLoading, setUpdateLoading] = React.useState(false)

    const fetchData = async (params: any) => {
        setRefreshLoading(true)
        try {
            const response = await EventService.getAll(params)
            setEvents(response.data)
        } catch (e) {
            console.error(e)
        } finally {
            setRefreshLoading(false)
        }
    }

    const handleCreateEvent = async (values: any) => {
        setCreateLoading(true)
        try {
            const res = await EventService.create(values)
            if (res.status === 200) {
                notification.success({
                    message: 'Tạo hoạt động thành công',
                })
                setIsModalCreateOpen(false)
                await fetchData({})
            }
        } catch (e) {
            notification.error({
                message: 'Tạo hoạt động thất bại',
            })
        } finally {
            setCreateLoading(false)
            setIsModalCreateOpen(false)
        }
    }

    const handleUpdateEvent = async (values: any) => {
        setUpdateLoading(true)
        try {
            const res = await EventService.update(record.id, values)
            if (res.status === 200) {
                notification.success({
                    message: 'Cập nhật hoạt động thành công',
                })
                setIsModalUpdateOpen(false)
                await fetchData({})
            }
        } catch (e) {
            notification.error({
                message: 'Cập nhật hoạt động thất bại',
            })
        } finally {
            setUpdateLoading(false)
            setIsModalUpdateOpen(false)
        }
    }

    const openModalUpdate = (item: any) => {
        setRecord(item)
        setIsModalUpdateOpen(true)
    }

    const handleDeleteCourse = async (values: any) => {
        try {
            const res = await EventService.delete(values.id)
            if (res.status === 200) {
                notification.success({
                    message: 'Xóa hoạt động thành công',
                })
                await fetchData({})
            }
        } catch (e) {
            notification.error({
                message: 'Xóa hoạt động thất bại',
            })
        }
    }

    const handleSearch = async (value: string) => {
        await fetchData({
            keyword: value,
        })
    }

    const columns: any = useMemo(() => {
        return getManageEventColumns(openModalUpdate, handleDeleteCourse)
    }, [])

    useEffect(() => {
        fetchData({})
    }, [])

    return (
        <div className="instructor-manage-courses" style={{ padding: '24px' }}>
            <Card style={{ marginBottom: '24px' }}>
                <Title level={2}>Quản lý hoạt động</Title>
                <Text type="secondary">Xem và thao tác với hoạt động</Text>
            </Card>
            <Card style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Search
                        placeholder="Tìm kiếm hoạt động..."
                        allowClear
                        enterButton={<SearchOutlined />}
                        onSearch={handleSearch}
                        style={{
                            width: '200px',
                            marginRight: '12px',
                        }}
                        disabled={refreshLoading}
                    />
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
                    <Button
                        type="primary"
                        size="middle"
                        icon={<PlusOutlined />}
                        onClick={() => setIsModalCreateOpen(true)}
                        style={{ marginBottom: '16px' }}
                    >
                        Thêm mới
                    </Button>
                </div>
                <Table
                    bordered
                    columns={columns}
                    dataSource={events}
                    loading={refreshLoading}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 'max-content' }}
                />
            </Card>
            <AdminCreateEventModal
                visible={isModalCreateOpen}
                onClose={() => {
                    setIsModalCreateOpen(false)
                }}
                onSubmit={(values: any) => handleCreateEvent(values)}
                loading={createLoading}
            />
            <AdminUpdateEventModal
                visible={isModalUpdateOpen}
                onClose={() => {
                    // @ts-ignore
                    setRecord(null)
                    setIsModalUpdateOpen(false)
                }}
                onSubmit={(values: any) => handleUpdateEvent(values)}
                loading={updateLoading}
                record={record}
            />
            {refreshLoading && (
                <div className="full-page-loading">
                    <Spin fullscreen={true} size="large" tip="Đang tải..." />
                </div>
            )}
        </div>
    )
}

export default AdminManageEventsPage
