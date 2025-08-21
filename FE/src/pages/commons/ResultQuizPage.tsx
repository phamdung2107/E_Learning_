import type React from 'react'
import { useEffect, useState } from 'react'

import { Button, Table, Typography } from 'antd'

import { ArrowLeftOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Link, useLocation, useParams } from 'react-router-dom'

import LessonQuizHeader from '@/components/commons/LessonQuizHeader'
import LessonQuizSidebar from '@/components/commons/LessonQuizSidebar'
import { RESULT_QUIZ_COLUMNS } from '@/constants/table'
import LessonQuizDetailLayout from '@/layouts/LessonQuizDetailLayout'
import CourseService from '@/services/course'
import LessonService from '@/services/lesson'
import ProgressService from '@/services/progress'
import QuizService from '@/services/quiz'
import ResultQuizService from '@/services/resultQuiz'

import '../styles/QuizDetail.css'

const { Title, Text } = Typography

const ResultQuizPage = () => {
    const user = useSelector((state: any) => state.auth.user)
    const userId = user.user ? user.user.id : user.id
    const params = useParams()
    const location = useLocation()
    const courseId = params.courseId as string
    const quizId = params.quizId as string

    const [progress, setProgress] = useState<any>(null)
    const [quiz, setQuiz] = useState<any>(null)
    const [course, setCourse] = useState<any>(null)
    const [lessons, setLessons] = useState<any[]>([])
    const [resultQuiz, setResultQuiz] = useState<any[]>([])

    const fetchData = async () => {
        try {
            const progressResponse = await ProgressService.getByUserCourse(
                userId,
                courseId
            )
            setProgress(progressResponse.total)

            const quizResponse = await QuizService.getDetail(quizId)
            setQuiz(quizResponse.data)

            const resultQuizResponse = await ResultQuizService.getMyQuiz(quizId)
            setResultQuiz(resultQuizResponse.data)

            const courseResponse = await CourseService.getDetail(courseId)
            setCourse(courseResponse.data)

            const lessonsResponse = await LessonService.getByCourse(courseId)
            const lessonsWithQuizzes = await Promise.all(
                lessonsResponse.data.map(async (lesson: any) => {
                    try {
                        const quizzesResponse = await QuizService.getByLesson(
                            lesson.id
                        )
                        return {
                            ...lesson,
                            quizzes: quizzesResponse.data || [],
                        }
                    } catch (error) {
                        return {
                            ...lesson,
                            quizzes: [],
                        }
                    }
                })
            )
            setLessons(lessonsWithQuizzes)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [quizId, courseId, location.pathname])

    const getProgressPercentage = () => {
        if (!progress) return 0
        return Math.round((progress / lessons.length) * 100)
    }

    if (!quiz || !course || lessons.length === 0) {
        return (
            <div style={{ padding: 48, textAlign: 'center' }}>
                <Text type="danger">Đang tải bài kiểm tra...</Text>
            </div>
        )
    }

    return (
        <LessonQuizDetailLayout
            header={
                <LessonQuizHeader
                    courseId={courseId}
                    courseTitle={course?.title}
                    progress={progress}
                    totalLessons={lessons?.length}
                    getProgressPercentage={getProgressPercentage}
                />
            }
            sidebar={
                <LessonQuizSidebar
                    currentLessonId={null}
                    currentQuizId={quiz?.id}
                    courseId={courseId}
                />
            }
        >
            <div className="quiz-detail-container">
                <div className="quiz-content">
                    <div className="quiz-main">
                        <div className="quiz-main-content">
                            <div className="quiz-taking-section">
                                <div className="quiz-taking-header">
                                    <Link
                                        to={`/courses/${courseId}/quizzes/${quizId}`}
                                    >
                                        <Button
                                            icon={<ArrowLeftOutlined />}
                                            type="text"
                                            style={{ paddingLeft: 0 }}
                                        >
                                            Quay lại bài kiểm tra
                                        </Button>
                                    </Link>
                                    <Title level={4}>
                                        {quiz?.title} - Kết quả
                                    </Title>
                                </div>
                                <br />
                                <Table
                                    bordered
                                    columns={RESULT_QUIZ_COLUMNS}
                                    dataSource={resultQuiz}
                                    scroll={{ x: 'max-content' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LessonQuizDetailLayout>
    )
}

export default ResultQuizPage
