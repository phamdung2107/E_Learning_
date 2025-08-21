import React from 'react'

import { Button, Card, Col, Progress, Row, Typography } from 'antd'

import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

import { useWindowSize } from '@/hooks/useWindowSize'

const { Title, Text } = Typography

const LessonQuizHeader = ({
    courseId,
    courseTitle,
    progress,
    totalLessons,
    getProgressPercentage,
}: any) => {
    const { innerWidth, innerHeight } = useWindowSize()

    return (
        <Card
            className="lesson-header"
            size="small"
            style={{
                borderLeft: 'none',
                borderRight: 'none',
                borderRadius: 0,
                marginBottom: 0,
            }}
        >
            <Row justify="space-between" align="middle">
                <Col>
                    <Link to={`/courses/${courseId}`}>
                        <Button
                            icon={<ArrowLeftOutlined />}
                            type="text"
                            style={{ paddingLeft: 0 }}
                        >
                            Quay lại khóa học
                        </Button>
                    </Link>
                </Col>
                {innerWidth >= 480 && (
                    <Col flex="1" style={{ textAlign: 'center' }}>
                        <Title
                            level={4}
                            style={{ margin: 0, color: '#20B2AA' }}
                        >
                            {courseTitle}
                        </Title>
                    </Col>
                )}
                <Col style={{ display: 'flex', alignItems: 'center' }}>
                    <Text type="secondary" style={{ marginRight: 6 }}>
                        Tiến độ: {progress || 0}/{totalLessons} bài học
                    </Text>
                    {innerWidth < 480 && (
                        <Progress
                            percent={getProgressPercentage()}
                            strokeColor="#20B2AA"
                            size={30}
                            type={'circle'}
                        />
                    )}
                </Col>
            </Row>
            {innerWidth < 480 && (
                <Row justify="center">
                    <Col>
                        <Title
                            ellipsis={{ rows: 1 }}
                            level={4}
                            style={{ margin: 0, color: '#20B2AA' }}
                        >
                            {courseTitle}
                        </Title>
                    </Col>
                </Row>
            )}
            {innerWidth >= 480 && (
                <Progress
                    percent={getProgressPercentage()}
                    style={{ marginTop: '12px' }}
                    strokeColor="#20B2AA"
                    size="small"
                />
            )}
        </Card>
    )
}

export default LessonQuizHeader
