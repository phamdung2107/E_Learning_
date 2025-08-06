import React, { useEffect, useMemo, useState } from 'react'

import { Button, Card, Spin, Table, Typography, notification } from 'antd'

import { FilterOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'

import AdminFilterUserDrawer from '@/components/core/drawer/AdminFilterCourseDrawer'
import CreateCourseModal from '@/components/core/modal/CreateCourseModal'
import UpdateCourseModal from '@/components/core/modal/UpdateCourseModal'
import {
    getAdminManageCourseColumns,
    getManageCourseColumns,
} from '@/constants/table'
import CategoryService from '@/services/category'
import CourseService from '@/services/course'
import UserService from '@/services/user'

const { Title, Text } = Typography

const AdminManageCoursesPage = () => {
    const [courses, setCourses] = useState<any[]>([])
    const [instructors, setInstructors] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([])
    const [record, setRecord] = useState<any>(null)
    const [isDrawerFilterCourseOpen, setIsDrawerFilterCourseOpen] =
        useState(false)
    const [filterCourseLoading, setFilterCourseLoading] = useState(false)
    const [refreshLoading, setRefreshLoading] = useState(false)

    const fetchData = async () => {
        setRefreshLoading(true)
        try {
            const [resCategories, resCourses, resInstructors] =
                await Promise.all([
                    CategoryService.getAll({}),
                    CourseService.getAll({}),
                    UserService.getAll({
                        role: 'instructor',
                    }),
                ])
            setCategories(resCategories.data)
            setCourses(
                resCourses.data.map((course: any) => ({
                    ...course,
                    category_name: course?.category?.name,
                    instructor_full_name: course?.instructor?.user?.full_name,
                }))
            )
            setInstructors(resInstructors.data)
        } catch (e) {
            console.error(e)
        } finally {
            setRefreshLoading(false)
        }
    }

    const handleFilterCourse = async (values: any) => {
        setRefreshLoading(true)
        try {
            const resCourses = await CourseService.getAll({
                category_id: values.category_id,
                instructor_id: values.instructor_id,
                search: values.search,
            })
            setCourses(
                resCourses.data.map((course: any) => ({
                    ...course,
                    category_name: course?.category?.name,
                    instructor_full_name: course?.instructor?.user?.full_name,
                }))
            )
        } catch (e) {
            console.error(e)
        } finally {
            setRefreshLoading(false)
        }
    }

    const handleDeleteCourse = async (values: any) => {
        try {
            const response = await CourseService.delete(values.id)
            if (response.status === 200) {
                await fetchData()
                notification.success({
                    message: 'Xóa khóa học thành công',
                })
            }
        } catch (e) {
            console.error(e)
            notification.error({
                message: 'Xóa khóa học thất bại',
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

    const openModalDelete = (item: any) => {
        setRecord(item)
        handleDeleteCourse(item)
    }

    const columns: any = useMemo(() => {
        return getAdminManageCourseColumns(openModalDelete, handlePublishCourse)
    }, [])

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="instructor-manage-courses" style={{ padding: '24px' }}>
            <Card style={{ marginBottom: '24px' }}>
                <Title level={2}>Quản lý khóa học</Title>
                <Text type="secondary">Xem và thao tác với khóa học</Text>
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
                        variant="outlined"
                        color="primary"
                        size="middle"
                        icon={<FilterOutlined />}
                        onClick={() => setIsDrawerFilterCourseOpen(true)}
                        style={{ marginBottom: '16px' }}
                    >
                        Lọc
                    </Button>
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

            <AdminFilterUserDrawer
                visible={isDrawerFilterCourseOpen}
                onClose={() => {
                    setIsDrawerFilterCourseOpen(false)
                }}
                onSubmit={(values: any) => handleFilterCourse(values)}
                loading={filterCourseLoading}
                categories={categories}
                instructors={instructors}
            />
            {refreshLoading && (
                <div className="full-page-loading">
                    <Spin fullscreen={true} size="large" tip="Đang tải..." />
                </div>
            )}
        </div>
    )
}

export default AdminManageCoursesPage
