import React, { useMemo, useState } from 'react'

import { Avatar, List, Modal, Rate, Select, Typography } from 'antd'

import { UserOutlined } from '@ant-design/icons'

import { BASE_IMAGE_URL } from '@/constants/image'

const { Text, Paragraph } = Typography

const ListReviewModal = ({ visible, onClose, reviews }: any) => {
    const [filterStar, setFilterStar] = useState<number | null>(null)

    const handleCancel = () => {
        onClose()
        setFilterStar(null)
    }

    const filteredReviews = useMemo(() => {
        if (!filterStar) return reviews
        return reviews.filter((r: any) => r.rating === filterStar)
    }, [reviews, filterStar])

    return (
        <Modal
            title="Danh sách đánh giá"
            open={visible}
            onCancel={handleCancel}
            className="course-modal"
            footer={null}
            styles={{
                body: {
                    maxHeight: '600px',
                    overflowY: 'auto',
                    paddingRight: 8,
                },
            }}
        >
            <div
                style={{
                    marginBottom: 16,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <span style={{ marginRight: 8 }}>Lọc theo số sao:</span>
                <Select
                    placeholder="Tất cả"
                    allowClear
                    style={{ width: 150 }}
                    value={filterStar ?? undefined}
                    onChange={(val) => setFilterStar(val)}
                >
                    <Select.Option value={5}>5 sao</Select.Option>
                    <Select.Option value={4}>4 sao</Select.Option>
                    <Select.Option value={3}>3 sao</Select.Option>
                    <Select.Option value={2}>2 sao</Select.Option>
                    <Select.Option value={1}>1 sao</Select.Option>
                </Select>
            </div>

            <List
                itemLayout="vertical"
                dataSource={filteredReviews}
                renderItem={(item: any) => (
                    <List.Item
                        key={item.id}
                        style={{
                            borderBottom: '1px solid #f0f0f0',
                            paddingBottom: 12,
                            marginBottom: 12,
                        }}
                    >
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    size="large"
                                    src={
                                        item.user?.avatar
                                            ? `${BASE_IMAGE_URL}${item.user.avatar}`
                                            : undefined
                                    }
                                    icon={<UserOutlined />}
                                />
                            }
                            title={
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text strong>{item.user?.full_name}</Text>
                                    <div style={{ flexGrow: 1 }}></div>
                                    <div>
                                        <Rate value={item.rating} disabled />
                                        <strong style={{ marginLeft: 8 }}>
                                            ({item.rating})
                                        </strong>
                                    </div>
                                </div>
                            }
                            description={
                                <Text type="secondary">{item.user?.email}</Text>
                            }
                            style={{ display: 'flex', alignItems: 'center' }}
                        />
                        <Paragraph style={{ marginTop: 8 }}>
                            {item.comment}
                        </Paragraph>
                    </List.Item>
                )}
            />
        </Modal>
    )
}

export default ListReviewModal
