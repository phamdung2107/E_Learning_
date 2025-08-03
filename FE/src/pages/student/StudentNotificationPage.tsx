import { useEffect, useState } from 'react'

import { Button, Card, List, Typography, notification } from 'antd'

import {
    BellOutlined,
    BookOutlined,
    DollarCircleOutlined,
    InfoCircleOutlined,
    ReloadOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'

import NotificationService from '@/services/notification'
import { getCurrentNotificationAction } from '@/stores/notification/notificationAction'

const { Title, Text } = Typography

const StudentNotificationPage = () => {
    const dispatch = useDispatch()
    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(false)

    const getNotificationIcon = (type: any) => {
        switch (type) {
            case 'system':
                return <InfoCircleOutlined style={{ color: '#1890ff' }} />
            case 'course':
                return <BookOutlined style={{ color: '#20B2AA' }} />
            case 'payment':
                return <DollarCircleOutlined style={{ color: '#faad14' }} />
            case 'other':
            default:
                return <BellOutlined style={{ color: '#999' }} />
        }
    }

    const fetchNotifications = async () => {
        setLoading(true)
        try {
            const res = await NotificationService.getAll()
            if (res.status === 200) {
                setNotifications(res.data)
            }
        } catch (e) {
            notification.error({ message: 'Lỗi khi tải thông báo' })
        } finally {
            setLoading(false)
        }
    }

    const markAsRead = async (id: any) => {
        try {
            const res = await NotificationService.maskAsRead(id)
            if (res.status === 200) {
                notification.success({ message: 'Đã đánh dấu đã đọc' })
                await fetchNotifications()
                dispatch(getCurrentNotificationAction())
            }
        } catch (e) {
            notification.error({ message: 'Lỗi khi đánh dấu đã đọc' })
        }
    }

    useEffect(() => {
        fetchNotifications()
    }, [])

    return (
        <div>
            <Card style={{ marginBottom: '24px' }}>
                <Title level={2}>Thông báo của tôi</Title>
                <Text type="secondary">Xem và kiểm tra thông báo</Text>
            </Card>

            <Card
                title={
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <span>Danh sách thông báo</span>
                        <Button
                            icon={<ReloadOutlined />}
                            onClick={fetchNotifications}
                            type="link"
                            loading={loading}
                        >
                            Làm mới
                        </Button>
                    </div>
                }
            >
                <List
                    dataSource={notifications}
                    loading={loading}
                    locale={{ emptyText: 'Không có thông báo nào' }}
                    renderItem={(item: any) => (
                        <List.Item
                            style={{
                                opacity: item.is_read ? 0.5 : 1,
                                transition: 'opacity 0.3s',
                            }}
                            actions={
                                !item.is_read
                                    ? [
                                          <Button
                                              size="small"
                                              type="link"
                                              onClick={() =>
                                                  markAsRead(item.id)
                                              }
                                          >
                                              Đánh dấu đã đọc
                                          </Button>,
                                      ]
                                    : []
                            }
                        >
                            <List.Item.Meta
                                avatar={getNotificationIcon(item.type)}
                                title={<Text>{item.title}</Text>}
                                description={
                                    <Text type="secondary">
                                        {new Date(
                                            item.created_at
                                        ).toLocaleString()}
                                    </Text>
                                }
                            />
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    )
}

export default StudentNotificationPage
