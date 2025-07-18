import React, { useEffect, useMemo, useState } from 'react'

import { Button, Card, Spin, Table, Typography, notification } from 'antd'

import { PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'

import CreateCourseModal from '@/components/core/modal/CreateCourseModal'
import UpdateCourseModal from '@/components/core/modal/UpdateCourseModal'
import { getManageCourseColumns } from '@/constants/table'
import CategoryService from '@/services/category'
import CourseService from '@/services/course'
import InstructorService from '@/services/instructor'

const { Title, Text } = Typography

const InstructorManageCoursesPage = () => {
    const user = useSelector((store: any) => store.auth.user)

    const [courses, setCourses] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([])
    const [record, setRecord] = useState<any>(null)
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false)
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(false)
    const [createLoading, setCreateLoading] = useState(false)
    const [refreshLoading, setRefreshLoading] = useState(false)

    const fetchData = async () => {
        setRefreshLoading(true)
        try {
            const [resCategories, resCourses] = await Promise.all([
                CategoryService.getAll({}),
                InstructorService.getCourses(user?.id),
            ])
            setCategories(resCategories.data)
            setCourses(resCourses.data)
        } catch (e) {
            console.error(e)
        } finally {
            setRefreshLoading(false)
        }
    }

    const handleUpdateCourse = async (values: any) => {
        setUpdateLoading(true)
        try {
            const formData = new FormData()
            formData.append('title', values.title)
            formData.append('description', values.description)
            formData.append('price', values.price)
            formData.append('category_id', values.category_id)
            if (values.thumbnail instanceof File) {
                formData.append('thumbnail', values.thumbnail) // Gửi file binary
            }
            formData.append('_method', 'PUT')

            const response = await CourseService.update(record.id, formData)
            if (response.status === 200) {
                setRecord(null)
                setIsModalUpdateOpen(false)
                await fetchData()
                notification.success({
                    message: 'Update course successfully',
                })
            }
        } catch (e) {
            console.error(e)
            notification.error({
                message: 'Update course failed. Please try again later.',
            })
        } finally {
            setUpdateLoading(false)
            setIsModalUpdateOpen(false)
        }
    }

    const handleCreateCourse = async (values: any) => {
        setCreateLoading(true)
        try {
            const formData = new FormData()
            formData.append('title', values.title)
            formData.append('description', values.description)
            formData.append('price', values.price)
            formData.append('category_id', values.category_id)
            formData.append('instructor_id', user?.id)
            if (values.thumbnail instanceof File) {
                formData.append('thumbnail', values.thumbnail)
            }
            const response = await CourseService.create(formData)
            if (response.status === 200) {
                setIsModalCreateOpen(false)
                await fetchData()
                notification.success({
                    message: 'Create course successfully',
                })
            }
        } catch (e) {
            console.error(e)
            notification.error({
                message: 'Create course failed. Please try again later.',
            })
        } finally {
            setCreateLoading(false)
            setIsModalCreateOpen(false)
        }
    }

    const handleDeleteCourse = async (values: any) => {
        try {
            const response = await CourseService.delete(values.id)
            if (response.status === 200) {
                await fetchData()
                notification.success({
                    message: 'Delete course successfully',
                })
            }
        } catch (e) {
            console.error(e)
            notification.error({
                message: 'Delete course failed. Please try again later.',
            })
        }
    }

    const handlePublishCourse = async (values: any) => {
        try {
            const response = await CourseService.publish(values.id)
            if (response.status === 200) {
                await fetchData()
                notification.success({
                    message: 'Publish course successfully',
                })
            }
        } catch (e) {
            console.error(e)
            notification.error({
                message: 'Publish course failed. Please try again later.',
            })
        }
    }

    const handleArchiveCourse = async (values: any) => {
        try {
            const response = await CourseService.archive(values.id)
            if (response.status === 200) {
                await fetchData()
                notification.success({
                    message: 'Archive course successfully',
                })
            }
        } catch (e) {
            console.error(e)
            notification.error({
                message: 'Archive course failed. Please try again later.',
            })
        }
    }

    const openModalUpdate = (item: any) => {
        setRecord(item)
        setIsModalUpdateOpen(true)
    }

    const openModalDelete = (item: any) => {
        setRecord(item)
        handleDeleteCourse(item)
    }

    const columns: any = useMemo(() => {
        return getManageCourseColumns(
            openModalUpdate,
            openModalDelete,
            handlePublishCourse,
            handleArchiveCourse,
            categories
        )
    }, [categories])

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="instructor-manage-courses" style={{ padding: '24px' }}>
            <Card style={{ marginBottom: '24px' }}>
                <Title level={2}>Manage Courses</Title>
                <Text type="secondary">View and action with my courses</Text>
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
                        onClick={() => setIsModalCreateOpen(true)}
                        style={{ marginBottom: '16px' }}
                    ></Button>
                </div>
                <Table
                    bordered
                    columns={columns}
                    dataSource={courses}
                    loading={refreshLoading}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                />
            </Card>
            <UpdateCourseModal
                visible={isModalUpdateOpen}
                onClose={() => {
                    // @ts-ignore
                    setRecord(null)
                    setIsModalUpdateOpen(false)
                }}
                onSubmit={(values: any) => handleUpdateCourse(values)}
                loading={updateLoading}
                record={record}
                categories={categories}
            />
            <CreateCourseModal
                visible={isModalCreateOpen}
                onClose={() => {
                    setIsModalCreateOpen(false)
                }}
                onSubmit={(values: any) => handleCreateCourse(values)}
                loading={createLoading}
                categories={categories}
            />
            {refreshLoading && (
                <div className="full-page-loading">
                    <Spin fullscreen={true} size="large" tip="Loading..." />
                </div>
            )}
        </div>
    )
}

export default InstructorManageCoursesPage
