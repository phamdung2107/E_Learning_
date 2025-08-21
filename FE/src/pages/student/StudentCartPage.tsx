import React, { useEffect, useMemo, useState } from 'react'

import {
    Button,
    Card,
    Col,
    Image,
    Row,
    Space,
    Table,
    Tag,
    Tooltip,
    Typography,
    notification,
} from 'antd'

import { DeleteOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { CheckoutOrderModal } from '@/components/core/modal/CheckoutOrderModal'
import { DeleteOrderModal } from '@/components/core/modal/DeleteOrderModal'
import { BASE_IMAGE_URL } from '@/constants/image'
import { useWindowSize } from '@/hooks/useWindowSize'
import { PATHS, STUDENT_PATHS } from '@/routers/path'
import OrderService from '@/services/order'
import { getCurrentUserAction } from '@/stores/auth/authAction'
import { getCurrentCartAction } from '@/stores/cart/cartAction'
import { formatPrice } from '@/utils/format'

const { Title, Text } = Typography

const StudentCartPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [orders, setOrders] = useState<any[]>([])
    const [record, setRecord] = useState()
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
    const [isModalCheckoutOpen, setIsModalCheckoutOpen] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [checkoutLoading, setCheckoutLoading] = useState(false)
    const { innerWidth, innerHeight } = useWindowSize()

    const fetchOrders = async () => {
        try {
            const response = await OrderService.getMyOrders()
            setOrders(
                response.data
                    .filter((order: any) => order.payment_status === 'pending')
                    .map((order: any) => ({
                        ...order,
                        courseImage: order.course.thumbnail,
                        courseName: order.course.title,
                    }))
            )
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    const total = useMemo(() => {
        return orders.reduce(
            (sum, order) => sum + Number(order?.original_price),
            0
        )
    }, [orders])

    const handleDelete = async (values: any) => {
        setDeleteLoading(true)
        try {
            await OrderService.delete(values.id)
            notification.success({
                message: 'Xóa đơn hàng thành công',
            })
            await fetchOrders()
        } catch (e) {
            console.error(e)
            notification.error({
                message: 'Xóa đơn hàng thất bại. Vui lòng thử lại sau.',
            })
        } finally {
            setDeleteLoading(false)
            setIsModalDeleteOpen(false)
        }
    }

    const handleCheckout = async (values: any) => {
        setCheckoutLoading(true)
        try {
            for (const order of values) {
                await OrderService.confirm(order.id)
            }
            notification.success({
                message: 'Xác nhận đơn hàng thành công',
                description: 'Đang điều hướng về trang khóa học của bạn',
            })
            dispatch(getCurrentUserAction())
            dispatch(getCurrentCartAction())
            setTimeout(() => {
                navigate(STUDENT_PATHS.STUDENT_MY_COURSES)
            }, 1000)
        } catch (e: any) {
            if (e.response.data.message === 'Số dư không đủ để thanh toán') {
                notification.open({
                    type: 'warning',
                    message: e.response.data.message,
                    btn: (
                        <Button
                            variant="outlined"
                            onClick={() =>
                                navigate(STUDENT_PATHS.STUDENT_PROFILE)
                            }
                        >
                            Nạp tiền ngay
                        </Button>
                    ),
                })
            } else {
                notification.error({
                    message:
                        'Xác nhận đơn hàng thất bại. Vui lòng thử lại sau.',
                })
            }
        } finally {
            setCheckoutLoading(false)
            setIsModalCheckoutOpen(false)
        }
    }

    const columns: any = [
        {
            title: 'Tên khóa học',
            dataIndex: 'courseName',
            key: 'courseName',
            align: 'left' as const,
            fixed: innerWidth >= 480 && 'left',
        },
        {
            title: 'Ảnh',
            dataIndex: 'courseImage',
            key: 'courseImage',
            render: (text: any) => (
                <Image
                    src={`${BASE_IMAGE_URL}${text}`}
                    alt="course"
                    style={{ width: '80px', height: 'auto' }}
                />
            ),
        },
        {
            title: 'Giá',
            dataIndex: 'original_price',
            key: 'original_price',
            align: 'center' as const,
            render: (text: any) => `${formatPrice(text)}`,
        },
        {
            title: 'Hành động',
            key: 'action',
            align: 'center',
            fixed: innerWidth >= 480 && 'right',
            width: 120,
            render: (record: any) => (
                <Space>
                    <Tooltip title="Gỡ khỏi giỏ hàng" placement="bottom">
                        <Button
                            danger
                            size="small"
                            icon={<DeleteOutlined />}
                            onClick={(e) => {
                                e.stopPropagation()
                                setRecord(record)
                                setIsModalDeleteOpen(true)
                            }}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ]

    return (
        <div className="student-dashboard">
            <Card style={{ marginBottom: '24px' }}>
                <Title level={2}>Giỏ hàng của tôi</Title>
                <Text type="secondary">
                    Xem hoặc thanh toán các khóa học đã đặt
                </Text>
            </Card>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card
                        title="Giỏ hàng"
                        variant="borderless"
                        style={{ borderRadius: '8px' }}
                        styles={{
                            body: {
                                padding: innerWidth < 480 ? 0 : '24px',
                            },
                        }}
                    >
                        <Table
                            columns={columns}
                            dataSource={orders}
                            pagination={false}
                            bordered
                            style={{ borderRadius: '8px' }}
                            scroll={{ x: 'max-content' }}
                        />
                    </Card>
                </Col>
                <Col span={24} style={{ textAlign: 'right' }}>
                    <Button
                        type="primary"
                        onClick={() => navigate(PATHS.COURSES)}
                    >
                        Tiếp tục mua sắm
                    </Button>
                </Col>
                <Col span={24}>
                    <Card
                        title="Tổng giỏ hàng"
                        variant="borderless"
                        style={{ borderRadius: '8px' }}
                    >
                        <Row gutter={[16, 16]}>
                            <Col span={12}>Tạm tính</Col>
                            <Col span={12} style={{ textAlign: 'right' }}>
                                {formatPrice(total)}
                            </Col>
                            <Col span={12}>
                                <Tag color="blue">Tổng cộng</Tag>
                            </Col>
                            <Col
                                span={12}
                                style={{
                                    textAlign: 'right',
                                    fontWeight: 'bold',
                                }}
                            >
                                {formatPrice(total)}
                            </Col>
                        </Row>
                        <Button
                            type="primary"
                            size="large"
                            style={{ marginTop: '20px', float: 'right' }}
                            onClick={() => setIsModalCheckoutOpen(true)}
                            disabled={orders.length === 0}
                        >
                            Thanh toán
                        </Button>
                    </Card>
                </Col>
            </Row>

            <DeleteOrderModal
                visible={isModalDeleteOpen}
                onClose={() => {
                    // @ts-ignore
                    setRecord(null)
                    setIsModalDeleteOpen(false)
                }}
                onSubmit={(values: any) => handleDelete(values)}
                loading={deleteLoading}
                record={record}
            />

            <CheckoutOrderModal
                visible={isModalCheckoutOpen}
                onClose={() => {
                    // @ts-ignore
                    setIsModalCheckoutOpen(false)
                }}
                onSubmit={(values: any) => handleCheckout(values)}
                loading={checkoutLoading}
                orders={orders}
            />
        </div>
    )
}

export default StudentCartPage
