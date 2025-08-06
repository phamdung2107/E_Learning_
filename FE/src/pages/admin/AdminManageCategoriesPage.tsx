import React, { useEffect, useMemo, useState } from 'react'

import { Button, Card, Table, Typography, notification } from 'antd'

import { PlusOutlined, ReloadOutlined } from '@ant-design/icons'

import AdminCreateCategoryModal from '@/components/core/modal/AdminCreateCategoryModal'
import AdminUpdateCategoryModal from '@/components/core/modal/AdminUpdateCategoryModal'
import { getManageCategoryColumns } from '@/constants/table'
import CategoryService from '@/services/category'
import { convertCategoriesToTreeData } from '@/utils/convert'

const { Title, Text } = Typography

const AdminManageCategoriesPage = () => {
    const [refreshLoading, setRefreshLoading] = useState(false)
    const [categories, setCategories] = useState<any[]>([])
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false)
    const [record, setRecord] = useState<any>(null)
    const [updateLoading, setUpdateLoading] = useState(false)
    const [createLoading, setCreateLoading] = useState(false)

    const fetchData = async () => {
        setRefreshLoading(true)
        try {
            const response = await CategoryService.getTree()
            setCategories(convertCategoriesToTreeData(response.data))
        } catch (e) {
            console.error(e)
        } finally {
            setRefreshLoading(false)
        }
    }

    const openModalCreate = (item: any) => {
        setRecord(item)
        setIsModalUpdateOpen(true)
    }

    const handleCreateCategory = async (values: any) => {
        setCreateLoading(true)
        try {
            const response = await CategoryService.create({
                name: values.name,
                parent_id: values.parent_id ? values.parent_id : null,
            })
            if (response.status === 200) {
                notification.success({
                    message: 'Tạo danh mục khóa học thành công',
                })
                await fetchData()
            }
        } catch (e) {
            notification.error({
                message: 'Tạo danh mục khóa học thất bại',
            })
        } finally {
            setCreateLoading(false)
        }
    }

    const handleUpdateCategory = async (values: any) => {
        setUpdateLoading(true)
        try {
            const response = await CategoryService.update(record.id, {
                name: values.name,
                parent_id: values.parent_id ? values.parent_id : null,
            })
            if (response.status === 200) {
                notification.success({
                    message: 'Cập nhật danh mục khóa học thành công',
                })
                await fetchData()
            }
        } catch (e) {
            notification.error({
                message: 'Cập nhật danh mục khóa học thất bại',
            })
        } finally {
            setUpdateLoading(false)
        }
    }

    const handleDeleteCategory = async (values: any) => {
        try {
            const response = await CategoryService.delete(values.id)
            if (response.status === 200) {
                notification.success({
                    message: 'Xóa danh mục khóa học thành công',
                })
                await fetchData()
            }
        } catch (e) {
            notification.error({
                message: 'Xóa danh mục khóa học thất bại',
            })
        }
    }

    const columns: any = useMemo(() => {
        return getManageCategoryColumns(openModalCreate, handleDeleteCategory)
    }, [])

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="instructor-manage-courses" style={{ padding: '24px' }}>
            <Card style={{ marginBottom: '24px' }}>
                <Title level={2}>Quản lý danh mục khóa học</Title>
                <Text type="secondary">
                    Xem và thao tác với danh mục khóa học
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
                    dataSource={categories}
                    loading={refreshLoading}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 'max-content' }}
                />
            </Card>
            <AdminCreateCategoryModal
                visible={isModalCreateOpen}
                onClose={() => {
                    setIsModalCreateOpen(false)
                }}
                onSubmit={(values: any) => handleCreateCategory(values)}
                loading={createLoading}
            />
            <AdminUpdateCategoryModal
                visible={isModalUpdateOpen}
                onClose={() => {
                    // @ts-ignore
                    setRecord(null)
                    setIsModalUpdateOpen(false)
                }}
                onSubmit={(values: any) => handleUpdateCategory(values)}
                loading={updateLoading}
                record={record}
            />
        </div>
    )
}

export default AdminManageCategoriesPage
