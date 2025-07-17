import { Button, Card, notification, Spin, Table, Typography } from 'antd'
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getManageLessonColumns, getManageQuizColumns } from '@/constants/table'
import LessonService from '@/services/lesson'
import QuizService from '@/services/quiz'
import { useParams } from 'react-router-dom'
import CreateLessonModal from '@/components/core/modal/CreateLessonModal'
import updateLessonModal from '@/components/core/modal/UpdateLessonModal'
import UpdateLessonModal from '@/components/core/modal/UpdateLessonModal'
import CreateQuizModal from '@/components/core/modal/CreateQuizModal'
import UpdateQuizModal from '@/components/core/modal/UpdateQuizModal'
import ListQuestionModal from '@/components/core/modal/ListQuestionModal'

const { Title, Text } = Typography

const InstructorManageDetailCoursePage = () => {
    const params = useParams()
    const courseId = params.courseId as string
    const [refreshLoading, setRefreshLoading] = useState(false)
    const [lessons, setLessons] = useState<any[]>([])
    const [quizData, setQuizData] = useState<Record<string, any[]>>({})
    const [record, setRecord] = useState<any>(null)
    const [isModalCreateLessonOpen, setIsModalCreateLessonOpen] = useState(false)
    const [isModalUpdateLessonOpen, setIsModalUpdateLessonOpen] = useState(false)
    const [isModalCreateQuizOpen, setIsModalCreateQuizOpen] = useState(false)
    const [isModalUpdateQuizOpen, setIsModalUpdateQuizOpen] = useState(false)
    const [isModalListQuestionOpen, setIsModalListQuestionOpen] = useState(false)

    const [createLessonLoading, setCreateLessonLoading] = useState(false)
    const [updateLessonLoading, setUpdateLessonLoading] = useState(false)
    const [createQuizLoading, setCreateQuizLoading] = useState(false)
    const [updateQuizLoading, setUpdateQuizLoading] = useState(false)
    const [loadingKeys, setLoadingKeys] = useState<string[]>([])

    const fetchData = async () => {
        setRefreshLoading(true)
        try {
            const resLessons = await LessonService.getByCourse(courseId)
            setLessons(resLessons.data)
        } catch (e) {
            console.error(e)
        } finally {
            setRefreshLoading(false)
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
                    message: 'Create lesson successfully',
                })
            }
        } catch (e) {
            console.error(e)
            notification.error({
                message: 'Create lesson failed. Please try again later.',
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
                    message: 'Update lesson successfully',
                })
            }
        } catch (e) {
            console.error(e)
            notification.error({
                message: 'Update lesson failed. Please try again later.',
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
                    message: 'Delete lesson successfully',
                })
            }
        } catch (e) {
            console.error(e)
            notification.error({
                message: 'Delete lesson failed. Please try again later.',
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
                    message: 'Create quiz successfully',
                })
            }
        } catch (e) {
            console.error(e)
            notification.error({
                message: 'Create quiz failed. Please try again later.',
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
                    message: 'Update quiz successfully',
                })
            }
        } catch (e) {
            console.error(e)
            notification.error({
                message: 'Update quiz failed. Please try again later.',
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
                    message: 'Delete quiz successfully',
                })
            }
        } catch (e) {
            console.error(e)
            notification.error({
                message: 'Delete quiz failed. Please try again later.',
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
        console.log(item)
        setRecord(item)
        setIsModalListQuestionOpen(true)
    }

    const lessonColumns: any = getManageLessonColumns(openModalLessonUpdate, openModalLessonDelete, openModalQuizCreate)
    const quizColumns: any = getManageQuizColumns(openModalQuizUpdate, openModalQuizDelete, openModalListQuestion)

    return (
        <div className="instructor-manage-courses" style={{ padding: '24px' }}>
            <Card style={{ marginBottom: '24px' }}>
                <Title level={2}>Detail Course</Title>
                <Text type="secondary">View and action with detail course</Text>
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
                        onClick={() => setIsModalCreateLessonOpen(true)}
                        style={{ marginBottom: '16px' }}
                    >
                    </Button>
                </div>
                <Table
                    bordered
                    columns={lessonColumns}
                    dataSource={lessons}
                    loading={refreshLoading}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
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
                    <Spin
                        fullscreen={true}
                        size="large"
                        tip="Loading..."
                    />
                </div>
            )}
        </div>
    )
}

export default InstructorManageDetailCoursePage