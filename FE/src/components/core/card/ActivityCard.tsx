import type React from 'react'

import { Card, Typography } from 'antd'

import './styles/ActivityCard.css'

const { Title, Paragraph, Text } = Typography

const ActivityCard = ({ activity }: any) => {
    return (
        <Card hoverable className="activity-card">
            <div className="activity-icon" style={{ color: activity.color }}>
                {activity.icon}
            </div>
            <Title level={4} style={{ marginBottom: '12px' }}>
                {activity.title}
            </Title>
            <Paragraph
                style={{
                    color: '#666',
                    marginBottom: '16px',
                }}
            >
                {activity.description}
            </Paragraph>
            <Text
                style={{
                    color: activity.color,
                    fontWeight: '600',
                }}
            >
                {activity.participants}
            </Text>
        </Card>
    )
}

export default ActivityCard
