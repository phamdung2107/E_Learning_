import React, { useEffect, useState } from 'react'

import { Spin, Typography, message } from 'antd'

import { PlayCircleOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import LessonQuizActionsFooter from '@/components/commons/LessonQuizActionsFooter'
import LessonQuizHeader from '@/components/commons/LessonQuizHeader'
import LessonQuizSidebar from '@/components/commons/LessonQuizSidebar'
import { BASE_IMAGE_URL } from '@/constants/image'
import LessonQuizDetailLayout from '@/layouts/LessonQuizDetailLayout'
import CourseService from '@/services/course'
import LessonService from '@/services/lesson'
import ProgressService from '@/services/progress'
import QuizService from '@/services/quiz'

const { Title, Text, Paragraph } = Typography

const LessonDetailPage: React.FC = () => {
    const user = useSelector((store: any) => store.auth.user)
    const params = useParams()
    const courseId = params.courseId as string
    const lessonId = params.lessonId as string

    const [course, setCourse] = useState<any>(null)
    const [currentLesson, setCurrentLesson] = useState<any>(null)
    const [lessons, setLessons] = useState<any[]>([])
    const [progress, setProgress] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            try {
                const [courseRes, lessonsRes, progressRes, lessonDetailRes] =
                    await Promise.all([
                        CourseService.getDetail(courseId),
                        LessonService.getByCourse(courseId),
                        ProgressService.getByUserCourse(user.id, courseId),
                        LessonService.getDetail(lessonId),
                    ])
                setCourse(courseRes.data)
                const lessonsWithQuizzes = await Promise.all(
                    lessonsRes.data.map(async (lesson: any) => {
                        try {
                            const quizResponse = await QuizService.getByLesson(
                                lesson.id
                            )
                            return {
                                ...lesson,
                                quizzes: quizResponse.data || [],
                            }
                        } catch {
                            return { ...lesson, quizzes: [] }
                        }
                    })
                )
                setLessons(lessonsWithQuizzes)
                setProgress(progressRes.total)
                setCurrentLesson(lessonDetailRes.data)
            } catch (error) {
                message.error('Không thể tải dữ liệu bài học')
            }
            setLoading(false)
        }
        if (courseId && lessonId) loadData()
    }, [courseId, lessonId, user.id])

    const getProgressPercentage = () => {
        if (!progress) return 0
        return Math.round((progress / lessons.length) * 100)
    }

    if (!course || !currentLesson) {
        return (
            <div style={{ padding: 48, textAlign: 'center' }}>
                <Text type="danger">Đang tải chi tiết bài học...</Text>
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
                    totalLessons={lessons.length}
                    getProgressPercentage={getProgressPercentage}
                />
            }
            sidebar={
                <LessonQuizSidebar
                    currentLessonId={lessonId}
                    currentQuizId={null}
                    courseId={courseId}
                />
            }
            footer={
                <LessonQuizActionsFooter
                    currentElement={currentLesson}
                    courseId={courseId}
                    progress={progress}
                    totalLessons={lessons.length}
                />
            }
        >
            <div
                className="lesson-detail-container"
                style={{ padding: 0, minHeight: '100vh' }}
            >
                <div
                    className="lesson-main-content"
                    style={{ margin: '0 auto', padding: '0' }}
                >
                    <div
                        className="video-player-container"
                        style={{ marginBottom: 32 }}
                    >
                        <div className="video-player">
                            {currentLesson?.video_url ? (
                                <video
                                    controls
                                    width="100%"
                                    height="100%"
                                    poster={`${BASE_IMAGE_URL}${currentLesson?.thumbnail}`}
                                >
                                    <source
                                        src={currentLesson.video_url}
                                        type="video/mp4"
                                    />
                                    Trình duyệt của bạn không hỗ trợ video.
                                </video>
                            ) : (
                                <div
                                    className="video-placeholder"
                                    style={{ textAlign: 'center', padding: 48 }}
                                >
                                    <PlayCircleOutlined
                                        style={{ fontSize: 48, color: '#ccc' }}
                                    />
                                    <Text>Không có video</Text>
                                </div>
                            )}
                        </div>
                    </div>
                    <div style={{ padding: '0 36px' }}>
                        <div className="lesson-title-section">
                            <Title level={3}>{currentLesson?.title}</Title>
                        </div>
                        {currentLesson?.content && (
                            <div
                                className="lesson-content-section"
                                style={{ marginBottom: 32 }}
                            >
                                {currentLesson.type === 'text' ? (
                                    <div
                                        className="lesson-text-content"
                                        dangerouslySetInnerHTML={{
                                            __html: currentLesson.content,
                                        }}
                                    />
                                ) : (
                                    <div className="lesson-description">
                                        <Paragraph>
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: currentLesson.content,
                                                }}
                                            />
                                        </Paragraph>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {loading && (
                <div className="full-page-loading">
                    <Spin fullscreen={true} size="large" tip="Đang tải..." />
                </div>
            )}
        </LessonQuizDetailLayout>
    )
}

export default LessonDetailPage
