import React, { useEffect } from 'react'

import { Button, Card, Table, Typography } from 'antd'

import { ReloadOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'

import {
    RESULT_QUIZ_COLUMNS,
    STUDENT_PROGRESS_COLUMNS,
} from '@/constants/table'
import ProgressService from '@/services/progress'
import ResultQuizService from '@/services/resultQuiz'

const { Title, Text } = Typography

const InstructorManageDetailStudentPage = () => {
    const params = useParams()
    const studentId = params.studentId as string
    const [progress, setProgress] = React.useState<any[]>([])
    const [resultQuiz, setResultQuiz] = React.useState<any[]>([])
    const [refreshLoading, setRefreshLoading] = React.useState(false)

    const fetchProgress = async () => {
        setRefreshLoading(true)
        try {
            const response = await ProgressService.getByUser(studentId)
            if (response.status === 200) {
                setProgress(
                    response.data.map((res: any) => ({
                        ...res,
                        course_title: res?.course?.title,
                    }))
                )
            }
        } catch (e) {
            console.error(e)
        } finally {
            setRefreshLoading(false)
        }
    }

    const fetchResultQuiz = async () => {
        setRefreshLoading(true)
        try {
            const response = await ResultQuizService.getByUser(studentId)
            if (response.status === 200) {
                setResultQuiz(response.data)
            }
        } catch (e) {
            console.error(e)
        } finally {
            setRefreshLoading(false)
        }
    }

    useEffect(() => {
        fetchProgress()
        fetchResultQuiz()
    }, [studentId])

    return (
        <div className="instructor-manage-courses" style={{ padding: '24px' }}>
            <Card style={{ marginBottom: '24px' }}>
                <Title level={2}>Chi tiết học viên: {}</Title>
                <Text type="secondary">
                    Theo dõi quá trình học của học viên
                </Text>
            </Card>
            <Card style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Title level={3}>Danh sách tiến độ</Title>
                    <div style={{ flexGrow: 1 }}></div>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="middle"
                        icon={<ReloadOutlined />}
                        onClick={fetchProgress}
                        loading={refreshLoading}
                        style={{ marginBottom: '16px', marginRight: '16px' }}
                    >
                        Làm mới
                    </Button>
                </div>
                <Table
                    bordered
                    columns={STUDENT_PROGRESS_COLUMNS}
                    dataSource={progress}
                    loading={refreshLoading}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 'max-content' }}
                />
            </Card>
            <Card style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Title level={3}>Danh sách kết quả bài kiểm tra</Title>
                    <div style={{ flexGrow: 1 }}></div>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="middle"
                        icon={<ReloadOutlined />}
                        onClick={fetchResultQuiz}
                        loading={refreshLoading}
                        style={{ marginBottom: '16px', marginRight: '16px' }}
                    >
                        Làm mới
                    </Button>
                </div>
                <Table
                    bordered
                    columns={RESULT_QUIZ_COLUMNS}
                    dataSource={resultQuiz}
                    loading={refreshLoading}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 'max-content' }}
                />
            </Card>
        </div>
    )
}

export default InstructorManageDetailStudentPage
