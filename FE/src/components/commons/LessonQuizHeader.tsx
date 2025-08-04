import React from 'react'

import { Button, Card, Col, Progress, Row, Typography } from 'antd'

import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Title, Text } = Typography

const LessonQuizHeader = ({
    courseId,
    courseTitle,
    progress,
    totalLessons,
    getProgressPercentage,
}: any) => (
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
                    <Button icon={<ArrowLeftOutlined />} type="text">
                        Quay lại khóa học
                    </Button>
                </Link>
            </Col>
            <Col flex="1" style={{ textAlign: 'center' }}>
                <Title level={4} style={{ margin: 0, color: '#20B2AA' }}>
                    {courseTitle}
                </Title>
            </Col>
            <Col>
                <Text type="secondary">
                    Tiến độ: {progress || 0}/{totalLessons} bài học
                </Text>
            </Col>
        </Row>
        <Progress
            percent={getProgressPercentage()}
            style={{ marginTop: '12px' }}
            strokeColor="#20B2AA"
            size="small"
        />
    </Card>
)

export default LessonQuizHeader
