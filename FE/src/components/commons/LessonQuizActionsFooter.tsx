import React, { useEffect, useState } from 'react'

import { Button, Col, Row, notification } from 'antd'

import { LeftOutlined, PrinterOutlined, RightOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { STUDENT_PATHS } from '@/routers/path'
import CertificateService from '@/services/certificate'
import CourseService from '@/services/course'
import ProgressService from '@/services/progress'
import { convertLessonWithQuizData } from '@/utils/convert'

const LessonQuizActionsFooter = ({
    currentElement,
    courseId,
    progress,
    totalLessons,
}: any) => {
    const user = useSelector((state: any) => state.auth.user)
    const [lessonWithQuiz, setLessonWithQuiz] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const fetchLessonWithQuiz = async () => {
        try {
            const response = await CourseService.lessonWithQuiz(courseId)
            setLessonWithQuiz(convertLessonWithQuizData(response.data))
        } catch (error) {
            console.log(error)
        }
    }

    const maskCompletedLesson = async (lessonId: any) => {
        try {
            const response = await ProgressService.completeLesson({
                user_id: Number(user.user ? user.user.id : user.id),
                course_id: Number(courseId),
                lesson_id: Number(lessonId),
            })
            await fetchLessonWithQuiz()
            return response
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchLessonWithQuiz()
    }, [currentElement])

    const currentIndex = lessonWithQuiz.findIndex((item) => {
        if (currentElement.lesson_id) {
            return item.id === currentElement.id && item.type === 'quiz'
        } else {
            return item.id === currentElement.id && item.type === 'lesson'
        }
    })

    const currentItem =
        currentIndex !== -1 ? lessonWithQuiz[currentIndex] : null

    const isPrevDisabled = !currentItem || currentIndex <= 0

    const isNextDisabled = (() => {
        if (!currentItem) return true

        if (currentItem.type === 'lesson') {
            return currentIndex === lessonWithQuiz.length - 1
        }

        if (currentItem.type === 'quiz') {
            return (
                currentItem.is_pass !== 1 ||
                currentIndex === lessonWithQuiz.length - 1
            )
        }

        return true
    })()

    const lastLesson = [...lessonWithQuiz]
        .filter((item) => item.type === 'lesson')
        .sort((a, b) => b.id - a.id)[0]

    const isOnLastLessonOrQuiz =
        currentItem &&
        ((currentItem.type === 'lesson' && currentItem.id === lastLesson?.id) ||
            (currentItem.type === 'quiz' &&
                currentItem.lesson_id === lastLesson?.id))

    const isAllPassed =
        lessonWithQuiz.length > 0 &&
        lessonWithQuiz.every((item) => item.is_pass === 1)

    const getPrevItem = () => {
        if (isPrevDisabled) return null
        return lessonWithQuiz[currentIndex - 1]
    }

    const getNextItem = () => {
        if (isNextDisabled) return null
        return lessonWithQuiz[currentIndex + 1]
    }

    const onNavigate = (item: any) => {
        if (!item) return
        if (item.type === 'lesson') {
            if (
                !currentElement.lesson_id &&
                currentElement?.quizzes?.length === 0
            ) {
                maskCompletedLesson(currentElement.id).then((res) => {
                    if (res.status === 200) {
                        navigate(`/courses/${courseId}/lessons/${item.id}`)
                        navigate(0)
                    }
                })
            } else {
                navigate(`/courses/${courseId}/lessons/${item.id}`)
            }
        } else if (item.type === 'quiz') {
            navigate(`/courses/${courseId}/quizzes/${item.id}`)
        }
    }

    const handlePrint = async () => {
        setLoading(true)
        try {
            const userId = user.user ? user.user.id : user.id
            const noQuizAfterLastLesson =
                isOnLastLessonOrQuiz &&
                currentItem?.type === 'lesson' &&
                !lessonWithQuiz.some(
                    (item) =>
                        item.type === 'quiz' &&
                        item.lesson_id === currentItem.id
                )

            if (noQuizAfterLastLesson) {
                await maskCompletedLesson(currentItem.id)
            }

            const response = await CertificateService.create({
                user_id: Number(userId),
                course_id: Number(courseId),
            })
            if (response.status === 200) {
                notification.success({
                    message:
                        'Tạo chứng chỉ thành công. Đang điều hướng đến trang quản lý chứng chỉ',
                })
                navigate(STUDENT_PATHS.STUDENT_CERTIFICATE)
            } else {
                notification.warning({
                    message: response?.message,
                })
            }
        } catch (error) {
            notification.error({
                message: 'Chứng chỉ đã tồn tại',
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
            <Row gutter={[16, 16]} justify="space-between" align="middle">
                <Col>
                    <Button
                        disabled={isPrevDisabled}
                        onClick={() => onNavigate(getPrevItem())}
                        icon={<LeftOutlined />}
                        size="large"
                    >
                        Bài trước
                    </Button>
                </Col>
                <Col>
                    <Button
                        disabled={
                            !(
                                progress === totalLessons ||
                                (isOnLastLessonOrQuiz &&
                                    currentItem?.type === 'lesson' &&
                                    !lessonWithQuiz.some(
                                        (item) =>
                                            item.type === 'quiz' &&
                                            item.lesson_id === currentItem.id
                                    ))
                            )
                        }
                        onClick={handlePrint}
                        icon={<PrinterOutlined />}
                        size="large"
                        loading={loading}
                    >
                        In chứng chỉ
                    </Button>
                </Col>
                <Col>
                    <Button
                        type="primary"
                        disabled={isNextDisabled}
                        onClick={() => onNavigate(getNextItem())}
                        icon={<RightOutlined />}
                        size="large"
                    >
                        Bài tiếp theo
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default LessonQuizActionsFooter
