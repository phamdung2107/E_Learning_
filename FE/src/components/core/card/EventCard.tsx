'use client'

import type React from 'react'
import { useEffect, useState } from 'react'

import { Button, Card, Typography } from 'antd'

import { FireOutlined, GiftOutlined } from '@ant-design/icons'

import './styles/EventCard.css'

const { Title, Paragraph } = Typography

interface EventCardProps {
    event: any
    onJoin?: (eventId: number) => void
}

const EventCard: React.FC<EventCardProps> = ({ event, onJoin }) => {
    const [timeLeft, setTimeLeft] = useState<any>({})
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime()
            const startTime = new Date(event.start_time).getTime()
            const endTime = new Date(event.end_time).getTime()

            let targetTime
            let status = 'upcoming'

            if (now < startTime) {
                targetTime = startTime
                status = 'upcoming'
            } else if (now >= startTime && now <= endTime) {
                targetTime = endTime
                status = 'active'
                setIsActive(true)
            } else {
                status = 'ended'
                setTimeLeft({})
                return
            }

            const difference = targetTime - now

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor(
                        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                    ),
                    minutes: Math.floor(
                        (difference % (1000 * 60 * 60)) / (1000 * 60)
                    ),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                    status,
                })
            } else {
                setTimeLeft({})
            }
        }

        calculateTimeLeft()
        const timer = setInterval(calculateTimeLeft, 1000)

        return () => clearInterval(timer)
    }, [event.start_time, event.end_time])

    const handleJoin = () => {
        if (onJoin && event.status === 'active') {
            onJoin(event.id)
        }
    }

    const getStatusText = () => {
        const now = new Date().getTime()
        const startTime = new Date(event.start_time).getTime()
        const endTime = new Date(event.end_time).getTime()

        if (now < startTime) return 'upcoming'
        if (now >= startTime && now <= endTime) return 'active'
        return 'ended'
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const status = getStatusText()

    return (
        <Card
            styles={{ body: { padding: 0 } }}
            className="event-card"
            hoverable
        >
            <div className="event-card-cover">
                <div className={`event-card-status ${status}`}>
                    {status === 'active' && 'Đang diễn ra'}
                    {status === 'upcoming' && 'Sắp diễn ra'}
                    {status === 'ended' && 'Đã kết thúc'}
                </div>

                {event.bonus_percent > 0 && (
                    <div className="event-card-bonus">
                        <GiftOutlined />+{event.bonus_percent}%
                    </div>
                )}
            </div>

            <div className="event-card-body">
                <Title level={4} className="event-card-title">
                    {event.name}
                </Title>

                <Paragraph className="event-card-content">
                    {event.content}
                </Paragraph>

                {/*<div className="event-card-time">*/}
                {/*    <div className="event-card-time-item">*/}
                {/*        <CalendarOutlined className="event-card-time-icon" />*/}
                {/*        <span>Start: {formatDate(event.start_time)}</span>*/}
                {/*    </div>*/}
                {/*    <div className="event-card-time-item">*/}
                {/*        <ClockCircleOutlined className="event-card-time-icon" />*/}
                {/*        <span>End: {formatDate(event.end_time)}</span>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {Object.keys(timeLeft).length > 0 && (
                    <div className="event-card-countdown">
                        <div className="event-card-countdown-title">
                            {timeLeft.status === 'upcoming'
                                ? 'Bắt đầu sau'
                                : 'Kết thúc sau'}
                        </div>
                        <div className="event-card-countdown-time">
                            {timeLeft.days > 0 && (
                                <div className="event-card-countdown-unit">
                                    <span className="event-card-countdown-number">
                                        {timeLeft.days}
                                    </span>
                                    <span className="event-card-countdown-label">
                                        Ngày
                                    </span>
                                </div>
                            )}
                            <div className="event-card-countdown-unit">
                                <span className="event-card-countdown-number">
                                    {timeLeft.hours || 0}
                                </span>
                                <span className="event-card-countdown-label">
                                    Giờ
                                </span>
                            </div>
                            <div className="event-card-countdown-unit">
                                <span className="event-card-countdown-number">
                                    {timeLeft.minutes || 0}
                                </span>
                                <span className="event-card-countdown-label">
                                    Phút
                                </span>
                            </div>
                            <div className="event-card-countdown-unit">
                                <span className="event-card-countdown-number">
                                    {timeLeft.seconds || 0}
                                </span>
                                <span className="event-card-countdown-label">
                                    Giây
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="event-card-footer">
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        {event.bonus_percent > 0 && (
                            <span
                                style={{
                                    color: '#ff6b6b',
                                    fontWeight: '600',
                                    fontSize: '14px',
                                }}
                            >
                                <FireOutlined /> Thưởng +{event.bonus_percent}%
                            </span>
                        )}
                    </div>
                    <Button
                        type="primary"
                        className="event-card-btn"
                        onClick={handleJoin}
                        disabled={status === 'ended'}
                    >
                        {status === 'active' && 'Tham gia ngay'}
                        {status === 'upcoming' && 'Đăng ký'}
                        {status === 'ended' && 'Đã kết thúc'}
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default EventCard
