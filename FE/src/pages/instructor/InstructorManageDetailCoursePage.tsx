import React, { useEffect, useMemo, useState } from 'react'

import {
    Button,
    Card,
    Select,
    Spin,
    Table,
    Typography,
    notification,
} from 'antd'

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

const InstructorManageDetailCoursePage = () => {
    const params = useParams()
    const courseId = params.courseId as string
    const [refreshLoading, setRefreshLoading] = useState(false)
    const [refreshLoadingReview, setRefreshLoadingReview] = useState(false)
    const [lessons, setLessons] = useState<any[]>([])
    const [reviews, setReviews] = useState<any[]>([])
    const [courseData, setCourseData] = useState<any>()
    const [quizData, setQuizData] = useState<Record<string, any[]>>({})
    const [record, setRecord] = useState<any>(null)
    const [filterStar, setFilterStar] = useState<number | null>(null)
    const [isModalCreateLessonOpen, setIsModalCreateLessonOpen] =
        useState(false)
    const [isModalUpdateLessonOpen, setIsModalUpdateLessonOpen] =
        useState(false)
    const [isModalCreateQuizOpen, setIsModalCreateQuizOpen] = useState(false)
    const [isModalUpdateQuizOpen, setIsModalUpdateQuizOpen] = useState(false)
    const [isModalListQuestionOpen, setIsModalListQuestionOpen] =
        useState(false)

    const [createLessonLoading, setCreateLessonLoading] = useState(false)
    const [updateLessonLoading, setUpdateLessonLoading] = useState(false)
    const [createQuizLoading, setCreateQuizLoading] = useState(false)
    const [updateQuizLoading, setUpdateQuizLoading] = useState(false)
    const [loadingKeys, setLoadingKeys] = useState<string[]>([])

    const filteredReviews = useMemo(() => {
        if (!filterStar) return reviews
        return reviews.filter((r: any) => r.rating === filterStar)
    }, [reviews, filterStar])

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

    const handleCreateLesson = async (values: any) => {
        setCreateLessonLoading(true)
        try {
            const response = await LessonService.create({
                title: values.title,
                content: values.content,
                course_id: courseId,
                order_number: values.order_number,
                video_url: values.video_url,
            })
            if (response.status === 200) {
                setIsModalCreateLessonOpen(false)
                await fetchData()
                notification.success({
                    message: 'Tạo bài học thành công',
                })
            } else {
                notification.warning({
                    message: response.message,
                })
            }
        } catch (e) {
            console.error(e)
            notification.error({
                message: 'Tạo bài học thất bại. Vui lòng thử lại sau.',
            })
        } finally {
            setCreateLessonLoading(false)
            setIsModalCreateLessonOpen(false)
        }
    }

    const handleUpdateLesson = async (values: any) => {
        setUpdateLessonLoading(true)
        try {
            const response = await LessonService.update(record.id, {
                title: values.title,
                content: values.content,
                order_number: values.order_number,
                video_url: values.video_url,
            })
            if (response.status === 200) {
                setIsModalUpdateLessonOpen(false)
                await fetchData()
                notification.success({
                    message: 'Cập nhật bài học thành công',
                })
            } else {
                notification.warning({
                    message: response.message,
                })
            }
        } catch (e) {
            console.error(e)
            notification.error({
                message: 'Cập nhật bài học thất bại. Vui lòng thử lại sau.',
            })
        } finally {
            setUpdateLessonLoading(false)
            setIsModalUpdateLessonOpen(false)
        }
    }

    const handleDeleteLesson = async (values: any) => {
        try {
            const response = await LessonService.delete(values.id)
            if (response.status === 200) {
                await fetchData()
                notification.success({
                    message: 'Xóa bài học thành công',
                })
            }
        } catch (e) {
            console.error(e)
            notification.error({
                message: 'Xóa bài học thất bại. Vui lòng thử lại sau.',
            })
        }
    }

    const handleCreateQuiz = async (values: any) => {
        setCreateQuizLoading(true)
        try {
            const response = await QuizService.create({
                title: values.title,
                lesson_id: record.id,
                description: values.description,
            })
            if (response.status === 200) {
                setIsModalCreateQuizOpen(false)
                await fetchData()
                await fetchQuizByLesson(response.data.lesson_id)
                notification.success({
                    message: 'Tạo bài kiểm tra thành công',
                })
            }
        } catch (e) {
            console.error(e)
            notification.error({
                message: 'Tạo bài kiểm tra thất bại. Vui lòng thử lại sau.',
            })
        } finally {
            setCreateQuizLoading(false)
            setIsModalCreateQuizOpen(false)
        }
    }

    const handleUpdateQuiz = async (values: any) => {
        setUpdateQuizLoading(true)
        try {
            const response = await QuizService.update(record.id, {
                title: values.title,
                description: values.description,
            })
            if (response.status === 200) {
                setIsModalUpdateQuizOpen(false)
                await fetchData()
                await fetchQuizByLesson(response.data.lesson_id)
                notification.success({
                    message: 'Cập nhật bài kiểm tra thành công',
                })
            }
        } catch (e) {
            console.error(e)
            notification.error({
                message:
                    'Cập nhật bài kiểm tra thất bại. Vui lòng thử lại sau.',
            })
        } finally {
            setUpdateQuizLoading(false)
            setIsModalUpdateQuizOpen(false)
        }
    }

    const handleDeleteQuiz = async (values: any) => {
        try {
            const response = await QuizService.delete(values.id)
            if (response.status === 200) {
                await fetchData()
                await fetchQuizByLesson(response.data.lesson_id)
                notification.success({
                    message: 'Xóa bài kiểm tra thành công',
                })
            }
        } catch (e) {
            console.error(e)
            notification.error({
                message: 'Xóa bài kiểm tra thất bại. Vui lòng thử lại sau.',
            })
        }
    }

    const openModalLessonUpdate = (item: any) => {
        setRecord(item)
        setIsModalUpdateLessonOpen(true)
    }

    const openModalQuizUpdate = (item: any) => {
        setRecord(item)
        setIsModalUpdateQuizOpen(true)
    }

    const openModalQuizCreate = (item: any) => {
        setRecord(item)
        setIsModalCreateQuizOpen(true)
    }

    const openModalLessonDelete = (item: any) => {
        setRecord(item)
        handleDeleteLesson(item)
    }

    const openModalQuizDelete = (item: any) => {
        setRecord(item)
        handleDeleteQuiz(item)
    }

    const openModalListQuestion = (item: any) => {
        setRecord(item)
        setIsModalListQuestionOpen(true)
    }

    const lessonColumns: any = getManageLessonColumns(
        openModalLessonUpdate,
        openModalLessonDelete,
        openModalQuizCreate
    )
    const quizColumns: any = getManageQuizColumns(
        openModalQuizUpdate,
        openModalQuizDelete,
        openModalListQuestion
    )

    const reviewColumns: any = getManageReviewColumns(openModalQuizDelete)

    return (
        <div className="instructor-manage-courses" style={{ padding: '24px' }}>
            <Card style={{ marginBottom: '24px' }}>
                <Title level={2}>Chi tiết khóa học: {courseData?.title}</Title>
                <Text type="secondary">
                    Xem và thao tác với chi tiết khóa học
                </Text>
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
                    <Button
                        type="primary"
                        size="middle"
                        icon={<PlusOutlined />}
                        onClick={() => setIsModalCreateLessonOpen(true)}
                        style={{ marginBottom: '16px' }}
                    >
                        Thêm bài học
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
                    <div
                        style={{
                            marginBottom: 16,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <span style={{ marginRight: 8 }}>Lọc theo số sao:</span>
                        <Select
                            placeholder="Tất cả"
                            allowClear
                            style={{ width: 150 }}
                            value={filterStar ?? undefined}
                            onChange={(val) => setFilterStar(val)}
                        >
                            <Select.Option value={5}>5 sao</Select.Option>
                            <Select.Option value={4}>4 sao</Select.Option>
                            <Select.Option value={3}>3 sao</Select.Option>
                            <Select.Option value={2}>2 sao</Select.Option>
                            <Select.Option value={1}>1 sao</Select.Option>
                        </Select>
                    </div>
                </div>
                <Table
                    bordered
                    columns={reviewColumns}
                    dataSource={filteredReviews}
                    loading={refreshLoadingReview}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 'max-content' }}
                />
            </Card>
            <CreateLessonModal
                visible={isModalCreateLessonOpen}
                onClose={() => {
                    setIsModalCreateLessonOpen(false)
                }}
                onSubmit={(values: any) => handleCreateLesson(values)}
                loading={createLessonLoading}
            />
            <UpdateLessonModal
                visible={isModalUpdateLessonOpen}
                onClose={() => {
                    setRecord(null)
                    setIsModalUpdateLessonOpen(false)
                }}
                onSubmit={(values: any) => handleUpdateLesson(values)}
                loading={updateLessonLoading}
                record={record}
            />
            <CreateQuizModal
                visible={isModalCreateQuizOpen}
                onClose={() => {
                    setRecord(null)
                    setIsModalCreateQuizOpen(false)
                }}
                onSubmit={(values: any) => handleCreateQuiz(values)}
                loading={createQuizLoading}
            />
            <UpdateQuizModal
                visible={isModalUpdateQuizOpen}
                onClose={() => {
                    setRecord(null)
                    setIsModalUpdateQuizOpen(false)
                }}
                onSubmit={(values: any) => handleUpdateQuiz(values)}
                loading={updateQuizLoading}
                record={record}
            />
            <ListQuestionModal
                visible={isModalListQuestionOpen}
                onClose={() => {
                    setRecord(null)
                    setIsModalListQuestionOpen(false)
                }}
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

export default InstructorManageDetailCoursePage
