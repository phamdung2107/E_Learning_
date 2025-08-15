import React from 'react'

import { Avatar, List, Modal, Rate, Typography } from 'antd'

import { UserOutlined } from '@ant-design/icons'

import { BASE_IMAGE_URL } from '@/constants/image'

const { Text, Paragraph } = Typography

const ListReviewModal = ({ visible, onClose, reviews }: any) => {
    const handleCancel = () => {
        onClose()
    }

    return (
        <Modal
            title="Danh sách đánh giá"
            open={visible}
            onCancel={handleCancel}
            width="50%"
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
            <List
                itemLayout="vertical"
                dataSource={reviews}
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
                                ></Avatar>
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
