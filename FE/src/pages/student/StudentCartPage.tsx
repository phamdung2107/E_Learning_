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
    Typography,
    notification,
} from 'antd'

import { DeleteOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'

import { CheckoutOrderModal } from '@/components/core/modal/CheckoutOrderModal'
import { DeleteOrderModal } from '@/components/core/modal/DeleteOrderModal'
import OrderService from '@/services/order'
import { getCurrentUserAction } from '@/stores/auth/authAction'
import { getCurrentCartAction } from '@/stores/cart/cartAction'
import { formatPrice } from '@/utils/format'

const { Title, Text } = Typography

const StudentCartPage = () => {
    const dispatch = useDispatch()
    const [orders, setOrders] = useState<any[]>([])
    const [record, setRecord] = useState()
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
    const [isModalCheckoutOpen, setIsModalCheckoutOpen] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [checkoutLoading, setCheckoutLoading] = useState(false)

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
                message: 'Delete order successfully',
            })
            await fetchOrders()
        } catch (e) {
            console.error(e)
            notification.success({
                message: 'Delete order failed. Please try again later.',
            })
        } finally {
            setDeleteLoading(false)
            setIsModalDeleteOpen(false)
        }
    }

    const handleCheckout = async (values: any) => {
        console.log('values:', values)
        setCheckoutLoading(true)
        try {
            for (const order of values) {
                await OrderService.confirm(order.id)
            }
            notification.success({
                message: 'Order confirmed successfully',
            })
            dispatch(getCurrentUserAction())
            dispatch(getCurrentCartAction())
            await fetchOrders()
        } catch (e) {
            console.error(e)
            notification.success({
                message: 'Order confirmed failed. Please try again later.',
            })
        } finally {
            setCheckoutLoading(false)
            setIsModalCheckoutOpen(false)
        }
    }

    const columns: any = [
        {
            title: 'Image',
            dataIndex: 'courseImage',
            key: 'courseImage',
            render: (text: any) => (
                <Image
                    src={text}
                    alt="course"
                    style={{ width: '80px', height: 'auto' }}
                />
            ),
        },
        {
            title: 'Course Name',
            dataIndex: 'courseName',
            key: 'courseName',
            align: 'left' as const,
        },
        {
            title: 'Price',
            dataIndex: 'original_price',
            key: 'original_price',
            align: 'center' as const,
            render: (text: any) => `${formatPrice(text)}`,
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            width: 120,
            render: (record: any) => (
                <Space>
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
                </Space>
            ),
        },
    ]

    return (
        <div>
            <Card style={{ marginBottom: '24px' }}>
                <Title level={2}>My Cart</Title>
                <Text type="secondary">View or payment order courses</Text>
            </Card>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card
                        title="Your Cart"
                        bordered={false}
                        style={{ borderRadius: '8px' }}
                    >
                        <Table
                            columns={columns}
                            dataSource={orders}
                            pagination={false}
                            bordered
                            style={{ borderRadius: '8px' }}
                        />
                    </Card>
                </Col>
                <Col span={24} style={{ textAlign: 'right' }}>
                    <Button type="primary">Continue Shopping</Button>
                </Col>
                <Col span={24}>
                    <Card
                        title="Cart Total"
                        bordered={false}
                        style={{ borderRadius: '8px' }}
                    >
                        <Row gutter={[16, 16]}>
                            <Col span={12}>Subtotal</Col>
                            <Col span={12} style={{ textAlign: 'right' }}>
                                {formatPrice(total)}
                            </Col>
                            <Col span={12}>
                                <Tag color="blue">Total</Tag>
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
                            Checkout
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
