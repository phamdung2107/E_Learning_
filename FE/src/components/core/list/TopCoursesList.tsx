import React from 'react'

import { Avatar, Card, List, Progress, Typography } from 'antd'

import { BookOutlined } from '@ant-design/icons'

const { Text, Title } = Typography

const TopCoursesList = ({ instructorId }: any) => {
    const courses = [
        {
            id: 1,
            title: 'Introduction to Python Programming',
            students: 150,
            completionRate: 85,
            thumbnail: 'https://via.placeholder.com/40',
        },
        {
            id: 2,
            title: 'Web Development with React',
            students: 200,
            completionRate: 78,
            thumbnail: 'https://via.placeholder.com/40',
        },
        {
            id: 3,
            title: 'Data Science Fundamentals',
            students: 120,
            completionRate: 90,
            thumbnail: 'https://via.placeholder.com/40',
        },
    ]

    return (
        <List
            itemLayout="horizontal"
            dataSource={courses}
            renderItem={(course) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={
                            <Avatar
                                src={course.thumbnail}
                                icon={<BookOutlined />}
                            />
                        }
                        title={<Text strong>{course.title}</Text>}
                        description={
                            <div>
                                <Text>{course.students} students enrolled</Text>
                                <br />
                                <Text type="secondary">
                                    Completion Rate:{' '}
                                    <Progress
                                        percent={course.completionRate}
                                        size="small"
                                    />
                                </Text>
                            </div>
                        }
                    />
                </List.Item>
            )}
        />
    )
}

export default TopCoursesList
