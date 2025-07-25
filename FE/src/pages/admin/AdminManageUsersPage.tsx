import React, { useEffect, useMemo, useState } from 'react'

import { Button, Card, Table, Typography } from 'antd'

import { FilterOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import Search from 'antd/es/input/Search'
import { useSelector } from 'react-redux'

import AdminFilterUserDrawer from '@/components/core/drawer/AdminFilterUserDrawer'
import AdminCreateUserModal from '@/components/core/modal/AdminCreateUserModal'
import AdminDeleteUserModal from '@/components/core/modal/AdminDeleteUserModal'
import AdminResetPasswordUserModal from '@/components/core/modal/AdminResetPasswordUserModal'
import AdminUpdateUserModal from '@/components/core/modal/AdminUpdateUserModal'
import { getManageUserColumns } from '@/constants/table'
import UserService from '@/services/user'

const { Title, Text } = Typography

const AdminManageUsersPage = () => {
    const user = useSelector((store: any) => store.auth.user)

    const [record, setRecord] = useState<any>(null)
    const [refreshLoading, setRefreshLoading] = useState(false)
    const [users, setUsers] = useState<any[]>([])
    const [isModalUpdateUserOpen, setIsModalUpdateUserOpen] = useState(false)
    const [isModalDeleteUserOpen, setIsModalDeleteUserOpen] = useState(false)
    const [isModalResetUserOpen, setIsModalResetUserOpen] = useState(false)
    const [isModalCreateUserOpen, setIsModalCreateUserOpen] = useState(false)
    const [isDrawerFilterUserOpen, setIsDrawerFilterUserOpen] = useState(false)
    const [createUserLoading, setCreateUserLoading] = useState(false)
    const [updateUserLoading, setUpdateUserLoading] = useState(false)
    const [deleteUserLoading, setDeleteUserLoading] = useState(false)
    const [filterUserLoading, setFilterUserLoading] = useState(false)
    const [resetPasswordUserLoading, setResetPasswordUserLoading] =
        useState(false)

    const fetchData = async () => {
        setRefreshLoading(true)
        try {
            const response = await UserService.getAll({})
            setUsers(response.data)
        } catch (e) {
            console.error(e)
        } finally {
            setRefreshLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleCreateUser = async (values: any) => {}

    const handleUpdateUser = async (values: any) => {}

    const handleDeleteUser = async (values: any) => {}

    const handleResetPasswordUser = async (values: any) => {}

    const handleFilterUser = async (values: any) => {}

    const onEdit = (record: any) => {
        setRecord(record)
        setIsModalUpdateUserOpen(true)
    }

    const onDelete = (record: any) => {
        setRecord(record)
        setIsModalDeleteUserOpen(true)
    }

    const onResetPassword = (record: any) => {
        setRecord(record)
        setIsModalResetUserOpen(true)
    }

    const columns: any = useMemo(() => {
        return getManageUserColumns(onEdit, onDelete, onResetPassword)
    }, [])

    return (
        <div className="instructor-manage-courses" style={{ padding: '24px' }}>
            <Card style={{ marginBottom: '24px' }}>
                <Title level={2}>Manage Users</Title>
                <Text type="secondary">View and action with users</Text>
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
                    <Button
                        type="primary"
                        size="middle"
                        icon={<PlusOutlined />}
                        onClick={() => setIsModalCreateUserOpen(true)}
                        style={{ marginBottom: '16px', marginRight: '16px' }}
                    ></Button>
                    <Button
                        type="primary"
                        variant="outlined"
                        color="primary"
                        size="middle"
                        icon={<FilterOutlined />}
                        onClick={() => setIsDrawerFilterUserOpen(true)}
                        style={{ marginBottom: '16px' }}
                    ></Button>
                </div>
                <Table
                    bordered
                    columns={columns}
                    dataSource={users}
                    loading={refreshLoading}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                />
            </Card>
            <AdminUpdateUserModal
                visible={isModalUpdateUserOpen}
                onClose={() => {
                    // @ts-ignore
                    setRecord(null)
                    setIsModalUpdateUserOpen(false)
                }}
                onSubmit={(values: any) => handleUpdateUser(values)}
                loading={updateUserLoading}
                record={record}
            />
            <AdminDeleteUserModal
                visible={isModalDeleteUserOpen}
                onClose={() => {
                    // @ts-ignore
                    setRecord(null)
                    setIsModalDeleteUserOpen(false)
                }}
                onSubmit={(values: any) => handleDeleteUser(values)}
                loading={deleteUserLoading}
                record={record}
            />
            <AdminResetPasswordUserModal
                visible={isModalResetUserOpen}
                onClose={() => {
                    // @ts-ignore
                    setRecord(null)
                    setIsModalResetUserOpen(false)
                }}
                onSubmit={(values: any) => handleResetPasswordUser(values)}
                loading={resetPasswordUserLoading}
                record={record}
            />
            <AdminCreateUserModal
                visible={isModalCreateUserOpen}
                onClose={() => {
                    // @ts-ignore
                    setRecord(null)
                    setIsModalCreateUserOpen(false)
                }}
                onSubmit={(values: any) => handleCreateUser(values)}
                loading={createUserLoading}
                record={record}
            />
            <AdminFilterUserDrawer
                visible={isDrawerFilterUserOpen}
                onClose={() => {
                    setIsDrawerFilterUserOpen(false)
                }}
                onSubmit={(values: any) => handleFilterUser(values)}
                loading={filterUserLoading}
            />
        </div>
    )
}

export default AdminManageUsersPage
