import React, { useEffect, useMemo, useState } from 'react'
import { Button, Card, Spin, Table, Typography } from 'antd'
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons'

import InstructorService from '@/services/instructor'
import CategoryService from '@/services/category'
import CourseService from '@/services/course'
import { useSelector } from 'react-redux'
import { getManageCourseColumns } from '@/constants/table'
import UpdateCourseModal from '@/components/core/modal/UpdateCourseModal'

const { Title, Text } = Typography

const InstructorManageCoursesPage = () => {
    const user = useSelector((store: any) => store.auth.user)

    const [courses, setCourses] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([])
    const [record, setRecord] = useState<any>(null)
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false)
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(false)
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
            const response = await CourseService.update(record.id, {
                title: values.title,
                description: values.description,
                price: values.price,
                category_id: values.category_id,
            })
            if (response.status === 200) {
                setRecord(null)
                setIsModalUpdateOpen(false)
                fetchData()
            }
        } catch (e) {
            console.error(e)
        } finally {
            setUpdateLoading(false)
            setIsModalUpdateOpen(false)
        }
    }

    const openModalUpdate = (item: any) => {
        setRecord(item)
        setIsModalUpdateOpen(true)
    }

    const openModalDelete = (item: any) => {
        setRecord(item)
    }

    const columns: any = useMemo(() => {
        return getManageCourseColumns(openModalUpdate, openModalDelete, categories)
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
                    >
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
            {refreshLoading && (
                <div className="full-page-loading">
                    <Spin
                        fullscreen={true}
                        size="large"
                        tip="Loading..."
                    />
                </div>
            )}
        </div>
    )
};

export default InstructorManageCoursesPage