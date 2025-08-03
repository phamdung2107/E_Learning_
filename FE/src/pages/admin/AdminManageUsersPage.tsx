import React, { useEffect, useMemo, useState } from 'react'

import { Button, Card, Table, Typography, notification } from 'antd'

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

    const handleCreateUser = async (values: any) => {
        setCreateUserLoading(true)
        try {
            const response = await UserService.create(values)
            if (response.status === 200) {
                await fetchData()
                notification.success({
                    message: 'Tạo người dùng thành công',
                })
            }
        } catch (e) {
            notification.error({
                message: 'Tạo người dùng thất bại',
            })
        } finally {
            setCreateUserLoading(false)
        }
    }

    const handleUpdateUser = async (values: any) => {
        setUpdateUserLoading(true)
        try {
            await UserService.update(record.id, {
                full_name: values.full_name,
                email: values.email,
                phone: values.phone,
                gender: values.gender,
                date_of_birth: values.date_of_birth,
            })

            if (values.status) {
                try {
                    await UserService.changeStatus(record.id, {
                        status: values.status,
                    })
                } catch {
                    notification.warning({
                        message: 'Cập nhật trạng thái thất bại',
                    })
                }
            }

            if (values.role) {
                try {
                    await UserService.changeRole(record.id, {
                        role: values.role,
                    })
                } catch {
                    notification.warning({
                        message: 'Cập nhật vai trò thất bại',
                    })
                }
            }
            await fetchData()
            notification.success({
                message: 'Cập nhật người dùng thành công',
            })
        } catch (e) {
            notification.error({
                message: 'Cập nhật thông tin người dùng thất bại',
            })
        } finally {
            setUpdateUserLoading(false)
        }
    }

    const handleDeleteUser = async (values: any) => {
        setDeleteUserLoading(true)
        try {
            const response = await UserService.delete(record.id)
            if (response.status === 200) {
                await fetchData()
                notification.success({
                    message: 'Xóa người dùng thành công',
                })
            }
        } catch (e) {
            notification.error({
                message: 'Xóa người dùng thất bại',
            })
        } finally {
            setDeleteUserLoading(false)
        }
    }

    const handleResetPasswordUser = async (values: any) => {
        setResetPasswordUserLoading(true)
        try {
            const response = await UserService.resetUser(record.id)
            if (response.status === 200) {
                notification.success({
                    message: 'Đặt lại mật khẩu người dùng thành công',
                })
            }
        } catch (e) {
            notification.error({
                message: 'Đặt lại mật khẩu người dùng thất bại',
            })
        } finally {
            setResetPasswordUserLoading(false)
        }
    }

    const handleFilterUser = async (values: any) => {
        setFilterUserLoading(true)
        try {
            const response = await UserService.getAll({
                search: values.search,
                role: values.role,
                status: values.status,
            })
            setUsers(response.data)
        } catch (e) {
            notification.error({
                message: 'Lọc người dùng thất bại',
            })
        } finally {
            setFilterUserLoading(false)
        }
    }

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
                <Title level={2}>Quản lý người dùng</Title>
                <Text type="secondary">Xem và thao tác với người dùng</Text>
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
                    <Button
                        type="primary"
                        size="middle"
                        icon={<PlusOutlined />}
                        onClick={() => setIsModalCreateUserOpen(true)}
                        style={{ marginBottom: '16px', marginRight: '16px' }}
                    >
                        Thêm mới
                    </Button>
                    <Button
                        type="primary"
                        variant="outlined"
                        color="primary"
                        size="middle"
                        icon={<FilterOutlined />}
                        onClick={() => setIsDrawerFilterUserOpen(true)}
                        style={{ marginBottom: '16px' }}
                    >
                        Lọc
                    </Button>
                </div>
                <Table
                    bordered
                    columns={columns}
                    dataSource={users}
                    loading={refreshLoading}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 'max-content' }}
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
