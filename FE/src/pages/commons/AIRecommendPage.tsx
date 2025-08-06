import React, { useEffect, useState } from 'react'

import {
    Button,
    Card,
    Col,
    Divider,
    Form,
    Input,
    List,
    Row,
    Space,
    Spin,
    Typography,
    message,
} from 'antd'

import {
    BulbOutlined,
    HistoryOutlined,
    RobotOutlined,
    SearchOutlined,
    SendOutlined,
} from '@ant-design/icons'
import Search from 'antd/es/input/Search'
import { useSelector } from 'react-redux'

import RecommendationService from '@/services/recommendation'

const { Text, Title, Paragraph } = Typography

const AIRecommendPage: React.FC = () => {
    const isAuthenticated = useSelector(
        (state: any) => state.auth.isAuthenticated
    )
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)
    const [history, setHistory] = useState<any[]>([])
    const [historyLoading, setHistoryLoading] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    useEffect(() => {
        setIsLoggedIn(!!isAuthenticated)
    }, [isAuthenticated])

    useEffect(() => {
        if (isLoggedIn) {
            setHistoryLoading(true)
            RecommendationService.getAll()
                .then((res: any) => {
                    setHistory(res.data || [])
                })
                .catch(() => {
                    message.error('Không thể lấy lịch sử recommendation')
                })
                .finally(() => setHistoryLoading(false))
        }
    }, [isLoggedIn])

    const onFinish = async (values: { title: string }) => {
        setLoading(true)
        setResult(null)
        try {
            const res = await RecommendationService.store({
                title: values.title,
            })
            setResult(res.data)
            message.success('Đã nhận được gợi ý từ AI!')
            if (isLoggedIn) setHistory((prev) => [res.data, ...prev])
        } catch (err: any) {
            message.error(
                err?.response?.data?.message || err.message || 'Có lỗi xảy ra!'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <section
                className="courses-hero-section"
                style={{
                    background:
                        'linear-gradient(90deg, #20B2AA 0%, #43e97b 100%)',
                    padding: '48px 0 32px 0',
                    position: 'relative',
                }}
            >
                <div className="courses-hero-floating-1" />
                <div className="courses-hero-floating-2" />
                <div
                    className="courses-hero-content"
                    style={{
                        maxWidth: 900,
                        margin: '0 auto',
                        padding: '0 16px',
                    }}
                >
                    <Title
                        level={1}
                        className="courses-hero-title"
                        style={{
                            color: '#fff',
                            fontWeight: 800,
                            marginBottom: 12,
                        }}
                    >
                        Khám phá các khóa học cùng AI
                    </Title>
                    <Paragraph
                        className="courses-hero-description"
                        style={{
                            color: '#f0f0f0',
                            fontSize: 18,
                            marginBottom: 32,
                        }}
                    >
                        Học kỹ năng mới, phát triển sự nghiệp và chinh phục mục
                        tiêu của bạn với nền tảng học tập toàn diện. <br />
                        <span style={{ color: '#ffe066', fontWeight: 600 }}>
                            Để AI giúp bạn chọn khóa học phù hợp nhất!
                        </span>
                    </Paragraph>
                    <Row gutter={[32, 32]} align="middle" justify="center">
                        <Col xs={24} md={14}>
                            {/*<Search*/}
                            {/*    placeholder="Tìm kiếm khóa học, giảng viên hoặc chủ đề..."*/}
                            {/*    allowClear*/}
                            {/*    enterButton={*/}
                            {/*        <Button*/}
                            {/*            type="primary"*/}
                            {/*            style={{*/}
                            {/*                background: '#20B2AA',*/}
                            {/*            }}*/}
                            {/*        >*/}
                            {/*            <SearchOutlined />*/}
                            {/*        </Button>*/}
                            {/*    }*/}
                            {/*    size="large"*/}
                            {/*    onSearch={() => {}}*/}
                            {/*    style={{ width: '100%' }}*/}
                            {/*/>*/}
                        </Col>
                        <Col span={16}>
                            <Card
                                style={{
                                    background: '#fff',
                                    borderRadius: 12,
                                    boxShadow:
                                        '0 4px 24px rgba(32,178,170,0.08)',
                                    border: 'none',
                                    marginBottom: 0,
                                }}
                                styles={{ body: { padding: 18 } }}
                            >
                                <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={onFinish}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        label={
                                            <span
                                                style={{
                                                    fontWeight: 600,
                                                    color: '#20B2AA',
                                                }}
                                            >
                                                <BulbOutlined /> Bạn muốn AI gợi
                                                ý điều gì?
                                            </span>
                                        }
                                        name="title"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Vui lòng nhập nội dung!',
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder="Ví dụ: Tôi muốn học lập trình Python"
                                            size="large"
                                            allowClear
                                        />
                                    </Form.Item>
                                    <Form.Item style={{ marginBottom: 0 }}>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            icon={<SendOutlined />}
                                            loading={loading}
                                            size="large"
                                            style={{
                                                background: '#20B2AA',
                                                border: 'none',
                                                fontWeight: 700,
                                                width: '100%',
                                            }}
                                        >
                                            Gửi cho AI
                                        </Button>
                                    </Form.Item>
                                </Form>
                                {loading && (
                                    <div
                                        style={{
                                            textAlign: 'center',
                                            margin: '16px 0',
                                        }}
                                    >
                                        <Spin tip="AI đang suy nghĩ..." />
                                    </div>
                                )}
                                {result && (
                                    <Card
                                        type="inner"
                                        title={
                                            <span
                                                style={{
                                                    color: '#20B2AA',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                <RobotOutlined /> Gợi ý của AI
                                            </span>
                                        }
                                        style={{
                                            marginTop: 16,
                                            background: '#f6ffed',
                                            borderColor: '#b7eb8f',
                                            borderRadius: 8,
                                        }}
                                        styles={{ body: { padding: 14 } }}
                                    >
                                        <Title
                                            level={5}
                                            style={{ color: '#20B2AA' }}
                                        >
                                            {result.title}
                                        </Title>
                                        <Text>{result.reason}</Text>
                                    </Card>
                                )}
                            </Card>
                        </Col>
                    </Row>
                </div>
            </section>

            {isLoggedIn && (
                <div
                    style={{
                        maxWidth: 900,
                        margin: '32px auto',
                        padding: '0 16px',
                    }}
                >
                    <Divider>
                        <HistoryOutlined style={{ color: '#20B2AA' }} />{' '}
                        <span style={{ color: '#20B2AA', fontWeight: 600 }}>
                            Lịch sử gợi ý của bạn
                        </span>
                    </Divider>
                    <Card>
                        {historyLoading ? (
                            <Spin />
                        ) : (
                            <List
                                dataSource={history}
                                locale={{ emptyText: 'Chưa có gợi ý nào.' }}
                                renderItem={(item) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            title={<b>{item.title}</b>}
                                            description={
                                                <>
                                                    <Text type="secondary">
                                                        {item.reason}
                                                    </Text>
                                                    {item.created_at && (
                                                        <div>
                                                            <Text
                                                                type="secondary"
                                                                style={{
                                                                    fontSize: 12,
                                                                }}
                                                            >
                                                                {new Date(
                                                                    item.created_at
                                                                ).toLocaleString()}
                                                            </Text>
                                                        </div>
                                                    )}
                                                </>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        )}
                    </Card>
                </div>
            )}
        </div>
    )
}

export default AIRecommendPage
