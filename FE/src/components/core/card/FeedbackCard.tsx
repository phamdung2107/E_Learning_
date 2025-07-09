import type React from 'react'

import { Card, Rate, Typography } from 'antd'

import { UserOutlined } from '@ant-design/icons'

import './styles/FeedbackCard.css'

const { Paragraph, Text } = Typography

const FeedbackCard = ({ review }: any) => {
    return (
        <Card className="review-card">
            <Rate disabled allowHalf defaultValue={review.rating} />
            <Paragraph
                ellipsis={{ rows: 5 }}
                style={{
                    fontSize: '16px',
                    color: '#666',
                    marginBottom: '20px',
                    fontStyle: 'italic',
                }}
            >
                "{review.review}"
            </Paragraph>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="review-avatar">
                    <UserOutlined
                        style={{ color: 'white', fontSize: '20px' }}
                    />
                </div>
                <div>
                    <Text strong style={{ display: 'block' }}>
                        {review.name}
                    </Text>
                    <Text type="secondary" style={{ fontSize: '14px' }}>
                        {review.role}
                    </Text>
                    <Text
                        type="secondary"
                        style={{ fontSize: '12px', display: 'block' }}
                    >
                        Course: {review.course}
                    </Text>
                </div>
            </div>
        </Card>
    )
}

export default FeedbackCard
