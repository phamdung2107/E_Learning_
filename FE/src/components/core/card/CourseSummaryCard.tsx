import type React from 'react'

import { Button, Card, Space, Typography } from 'antd'

import {
    PlayCircleOutlined,
    StarOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

import './styles/CourseSummaryCard.css'

const { Title, Text } = Typography

const CourseSummaryCard = ({ course }: any) => {
    return (
        <Card
            hoverable
            className="course-card"
            cover={
                <div className="course-cover">
                    <PlayCircleOutlined className="course-play-icon" />
                </div>
            }
            actions={[
                <Button
                    key="enroll"
                    type="primary"
                    block
                    className="course-enroll-btn"
                >
                    Enroll Now - {course.price}
                </Button>,
            ]}
        >
            <div style={{ marginBottom: '8px' }}>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                    {course.category}
                </Text>
            </div>
            <Link
                to={`/courses/${course.id}`}
                style={{ textDecoration: 'none' }}
            >
                <Title
                    ellipsis={{ rows: 1 }}
                    level={4}
                    style={{ marginBottom: '8px' }}
                >
                    {course.title}
                </Title>
            </Link>
            <Text type="secondary">by {course.instructor}</Text>
            <div
                style={{
                    marginTop: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Space>
                    <StarOutlined style={{ color: '#faad14' }} />
                    <Text>{course.rating}</Text>
                </Space>
                <Space>
                    <UserOutlined />
                    <Text>{course.students.toLocaleString()}</Text>
                </Space>
            </div>
        </Card>
    )
}

export default CourseSummaryCard
