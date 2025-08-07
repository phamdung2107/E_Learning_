import React, { useEffect, useState } from 'react'

import { Button, Card, Spin, Table, Typography, notification } from 'antd'

import { PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'

import CreateLessonModal from '@/components/core/modal/CreateLessonModal'
import CreateQuizModal from '@/components/core/modal/CreateQuizModal'
import ListQuestionModal from '@/components/core/modal/ListQuestionModal'
import UpdateLessonModal from '@/components/core/modal/UpdateLessonModal'
import UpdateQuizModal from '@/components/core/modal/UpdateQuizModal'
import {
    getManageLessonColumns,
    getManageQuizColumns,
    getManageReviewColumns,
} from '@/constants/table'
import CourseService from '@/services/course'
import LessonService from '@/services/lesson'
import QuizService from '@/services/quiz'
import ReviewService from '@/services/review'

const { Title, Text } = Typography

const AdminManageDetailCoursePage = () => {
    const params = useParams()
    const courseId = params.courseId as string
    const [refreshLoading, setRefreshLoading] = useState(false)
    const [refreshLoadingReview, setRefreshLoadingReview] = useState(false)
    const [lessons, setLessons] = useState<any[]>([])
    const [reviews, setReviews] = useState<any[]>([])
    const [courseData, setCourseData] = useState<any>()
    const [quizData, setQuizData] = useState<Record<string, any[]>>({})
    const [record, setRecord] = useState<any>(null)
    const [isModalListQuestionOpen, setIsModalListQuestionOpen] =
        useState(false)
    const [loadingKeys, setLoadingKeys] = useState<string[]>([])

    const fetchData = async () => {
        setRefreshLoading(true)
        setRefreshLoadingReview(true)
        try {
            const resLessons = await LessonService.getByCourse(courseId)
            const resCourse = await CourseService.getDetail(courseId)
            const resReviews = await ReviewService.getByCourse(courseId)
            setLessons(resLessons.data)
            setCourseData(resCourse.data)
            setReviews(
                resReviews.data.map((r: any) => ({
                    ...r,
                    user_full_name: r?.user?.full_name,
                    user_email: r?.user?.email,
                    user_phone: r?.user?.phone,
                    user_gender: r?.user?.gender,
                    user_date_of_birth: r?.user?.date_of_birth,
                }))
            )
        } catch (e) {
            console.error(e)
        } finally {
            setRefreshLoading(false)
            setRefreshLoadingReview(false)
        }
    }

    const fetchQuizByLesson = async (lessonId: string) => {
        setLoadingKeys((prev) => [...prev, lessonId])
        try {
            const resQuizzies = await QuizService.getByLesson(lessonId)
            setQuizData((prev) => ({
                ...prev,
                [lessonId]: resQuizzies.data,
            }))
        } catch (e) {
            console.error(e)
        } finally {
            setLoadingKeys((prev) => prev.filter((key) => key !== lessonId))
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const emptyFunction = (values: any) => {}

    const openModalListQuestion = (item: any) => {
        setRecord(item)
        setIsModalListQuestionOpen(true)
    }

    const lessonColumns: any = getManageLessonColumns(
        emptyFunction,
        emptyFunction,
        emptyFunction,
        'admin'
    )
    const quizColumns: any = getManageQuizColumns(
        emptyFunction,
        emptyFunction,
        openModalListQuestion,
        'admin'
    )

    const reviewColumns: any = getManageReviewColumns(emptyFunction, 'admin')

    return (
        <div className="instructor-manage-courses" style={{ padding: '24px' }}>
            <Card style={{ marginBottom: '24px' }}>
                <Title level={2}>Chi tiết khóa học: {courseData?.title}</Title>
                <Text type="secondary">Xem chi tiết khóa học</Text>
            </Card>
            <Card style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Title level={3}>Danh sách bài học</Title>
                    <div style={{ flexGrow: 1 }}></div>
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
                    columns={lessonColumns}
                    dataSource={lessons}
                    loading={refreshLoading}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 'max-content' }}
                    expandable={{
                        expandedRowRender: (record) => (
                            <Table
                                bordered
                                columns={quizColumns}
                                dataSource={quizData[record.id] || []}
                                pagination={false}
                                size="small"
                                loading={loadingKeys.includes(record.id)}
                                rowKey={(r) => r.pin || r.key}
                                scroll={{ x: 'max-content' }}
                            />
                        ),
                        onExpand: (expanded, record) => {
                            if (expanded && !quizData[record.id]) {
                                fetchQuizByLesson(record.id).then((r) => r)
                            }
                        },
                        rowExpandable: (record) => true,
                    }}
                />
            </Card>
            <Card style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Title level={3}>Danh sách đánh giá của khóa học</Title>
                    <div style={{ flexGrow: 1 }}></div>
                </div>
                <Table
                    bordered
                    columns={reviewColumns}
                    dataSource={reviews}
                    loading={refreshLoadingReview}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 'max-content' }}
                />
            </Card>
            <ListQuestionModal
                visible={isModalListQuestionOpen}
                onClose={() => {
                    setRecord(null)
                    setIsModalListQuestionOpen(false)
                }}
                record={record}
                role="admin"
            />
            {refreshLoading && (
                <div className="full-page-loading">
                    <Spin fullscreen={true} size="large" tip="Đang tải..." />
                </div>
            )}
        </div>
    )
}

export default AdminManageDetailCoursePage
