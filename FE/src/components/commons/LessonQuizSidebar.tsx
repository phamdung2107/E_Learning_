import React, { useEffect, useState } from 'react'

import { Collapse, Typography } from 'antd'

import {
    CheckCircleOutlined,
    FileTextOutlined,
    PlayCircleOutlined,
    RightOutlined,
} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import CourseService from '@/services/course'
import ProgressService from '@/services/progress'

import './styles/LessonQuizSidebar.css'

const { Title, Text } = Typography
const { Panel } = Collapse

const LessonQuizSidebar = ({
    currentLessonId,
    currentQuizId,
    courseId,
}: any) => {
    const user = useSelector((store: any) => store.auth.user)
    const [lessonWithQuiz, setLessonWithQuiz] = useState<any[]>([])

    const checkCompleted = (result: any) => {
        return (
            result.length > 0 &&
            result.every((item: any) => item?.latest_result_quiz?.is_pass === 1)
        )
    }

    const fetchLessonWithQuiz = async (courseId: number) => {
        try {
            const response = await CourseService.lessonWithQuiz(courseId)
            setLessonWithQuiz(response.data)
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
            await fetchLessonWithQuiz(courseId)
        } catch (error) {
            console.log(error)
        }
    }

    const getCurrentLessonIndex = () =>
        lessonWithQuiz?.findIndex((l: any) => l.id === Number(currentLessonId))

    const getLessonEnableList = () => {
        return lessonWithQuiz?.map((lesson: any, index: number) => {
            if (index === 0) return true
            const prevLesson = lessonWithQuiz[index - 1]
            return (
                checkCompleted(prevLesson.quizzes) ||
                prevLesson.quizzes.length === 0
            )
        })
    }

    const [completedLessonIds, setCompletedLessonIds] = useState(new Set())

    useEffect(() => {
        lessonWithQuiz.forEach((lesson) => {
            if (
                checkCompleted(lesson.quizzes) &&
                !completedLessonIds.has(lesson.id)
            ) {
                maskCompletedLesson(lesson.id)
                setCompletedLessonIds((prev) => new Set(prev).add(lesson.id))
            }
        })
    }, [lessonWithQuiz, completedLessonIds])

    useEffect(() => {
        fetchLessonWithQuiz(courseId)
    }, [courseId])

    return (
        <div className="lesson-sidebar-content" style={{ padding: 0 }}>
            <div
                className="lesson-sidebar-header"
                style={{
                    padding: '16px 24px 8px 24px',
                    borderBottom: '1px solid #f0f0f0',
                }}
            >
                <Title level={5} style={{ margin: 0 }}>
                    Nội dung khóa học
                </Title>
                <Text type="secondary">{lessonWithQuiz.length} bài học</Text>
            </div>
            <div className="lesson-list-container" style={{ padding: 0 }}>
                <Collapse
                    bordered={false}
                    defaultActiveKey={[getCurrentLessonIndex()?.toString()]}
                    expandIcon={({ isActive }) => (
                        <RightOutlined rotate={isActive ? 90 : 0} />
                    )}
                    className="lesson-collapse"
                >
                    {lessonWithQuiz.map((lesson: any, index: number) => {
                        const isLessonActive =
                            lesson.id === Number(currentLessonId)
                        const isLessonEnabled =
                            getLessonEnableList()[index] ?? false
                        return (
                            <Panel
                                header={
                                    <div
                                        style={{ display: 'flex' }}
                                        className="lesson-module-header"
                                    >
                                        <div className="lesson-module-title">
                                            {index + 1}. {lesson.title}
                                        </div>
                                        <div style={{ flexGrow: 1 }}></div>
                                        {lesson.is_completed && (
                                            <CheckCircleOutlined className="quiz-completed-icon" />
                                        )}
                                    </div>
                                }
                                key={lesson.id}
                                className={`lesson-panel ${isLessonActive ? 'active-panel' : ''}`}
                            >
                                {isLessonEnabled ? (
                                    <Link
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                        className={`lesson-content-item ${isLessonActive ? 'active-lesson' : ''}`}
                                        to={`/courses/${courseId}/lessons/${lesson.id}`}
                                    >
                                        <span
                                            className="lesson-content-icon"
                                            style={{ marginRight: 8 }}
                                        >
                                            <PlayCircleOutlined />
                                        </span>
                                        <span className="lesson-content-title">
                                            {lesson.title}
                                        </span>
                                        <div style={{ flexGrow: 1 }}></div>
                                        {lesson.is_completed && (
                                            <CheckCircleOutlined className="quiz-completed-icon" />
                                        )}
                                    </Link>
                                ) : (
                                    <div className="lesson-content-item disabled-lesson">
                                        <span
                                            className="lesson-content-icon"
                                            style={{ marginRight: 8 }}
                                        >
                                            <PlayCircleOutlined />
                                        </span>
                                        <span className="lesson-content-title">
                                            {lesson.title}
                                        </span>
                                    </div>
                                )}

                                {lesson.quizzes?.map(
                                    (quiz: any, qIdx: number) => {
                                        let quizEnabled = false
                                        if (qIdx === 0) {
                                            quizEnabled = isLessonEnabled
                                        } else {
                                            quizEnabled =
                                                isLessonEnabled &&
                                                lesson.quizzes[qIdx - 1]
                                                    ?.latest_result_quiz
                                                    ?.is_pass === 1
                                        }
                                        const isQuizActive =
                                            quiz.id === Number(currentQuizId)

                                        return quizEnabled ? (
                                            <Link
                                                key={quiz.id}
                                                to={`/courses/${courseId}/quizzes/${quiz.id}`}
                                                className={`lesson-content-item quiz-item ${isQuizActive ? 'active-lesson' : ''}`}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <span
                                                    className="lesson-content-icon quiz-icon"
                                                    style={{ marginRight: 8 }}
                                                >
                                                    <FileTextOutlined />
                                                </span>
                                                <span className="lesson-content-title">
                                                    {quiz.title}
                                                </span>
                                                <div
                                                    style={{ flexGrow: 1 }}
                                                ></div>
                                                {quiz?.latest_result_quiz
                                                    ?.is_pass === 1 && (
                                                    <CheckCircleOutlined className="quiz-completed-icon" />
                                                )}
                                            </Link>
                                        ) : (
                                            <div
                                                key={quiz.id}
                                                className="lesson-content-item quiz-item disabled-lesson"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    color:
                                                        lesson.quizzes[qIdx - 1]
                                                            ?.latest_result_quiz
                                                            ?.is_pass !== 1
                                                            ? undefined
                                                            : '#595959',
                                                }}
                                            >
                                                <span
                                                    className="lesson-content-icon quiz-icon"
                                                    style={{ marginRight: 8 }}
                                                >
                                                    <FileTextOutlined />
                                                </span>
                                                <span className="lesson-content-title">
                                                    {quiz.title}
                                                </span>
                                            </div>
                                        )
                                    }
                                )}
                            </Panel>
                        )
                    })}
                </Collapse>
            </div>
        </div>
    )
}

export default LessonQuizSidebar
