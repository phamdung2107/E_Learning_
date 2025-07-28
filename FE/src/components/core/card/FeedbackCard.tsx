import type React from 'react'

import { Avatar, Card, Rate, Typography } from 'antd'

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
                "{review.comment}"
            </Paragraph>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="review-avatar">
                    <Avatar
                        src={
                            <img
                                src={review?.user?.avatar}
                                alt={review?.user?.full_name}
                            />
                        }
                    />
                </div>
                <div>
                    <Text strong style={{ display: 'block' }}>
                        {review?.user?.full_name}
                    </Text>
                    <Text type="secondary" style={{ fontSize: '14px' }}>
                        {review?.user?.role}
                    </Text>
                    <Text
                        type="secondary"
                        style={{ fontSize: '12px', display: 'block' }}
                    >
                        Khóa học: {review?.course?.title}
                    </Text>
                </div>
            </div>
        </Card>
    )
}

export default FeedbackCard
