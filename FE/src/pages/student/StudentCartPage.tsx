import React, { useState } from 'react'

import {
    Button,
    Card,
    Col,
    InputNumber,
    Row,
    Table,
    Tag,
    Typography,
} from 'antd'

const { Title, Text } = Typography

const StudentCartPage = () => {
    const [courses, setCourses] = useState([
        {
            key: '1',
            image: 'path-to-image-1.jpg', // Replace with actual image path
            name: 'Marketing: First Day Guide',
            price: 3000000,
            quantity: 1,
        },
        {
            key: '2',
            image: 'path-to-image-2.jpg', // Replace with actual image path
            name: 'Design: Basics for Beginners',
            price: 2500000,
            quantity: 2,
        },
    ])

    const updateQuantity = (key, value) => {
        setCourses(
            courses.map((course) =>
                course.key === key ? { ...course, quantity: value } : course
            )
        )
    }

    const total = courses.reduce(
        (sum, course) => sum + course.price * course.quantity,
        0
    )

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (text) => (
                <img
                    src={text}
                    alt="course"
                    style={{ width: '80px', height: 'auto' }}
                />
            ),
        },
        {
            title: 'Course Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => `$${text.toLocaleString()}`,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text, record) => (
                <InputNumber
                    min={1}
                    value={text}
                    onChange={(value) => updateQuantity(record.key, value)}
                />
            ),
        },
        {
            title: 'Total',
            key: 'total',
            render: (record) =>
                `$${(record.price * record.quantity).toLocaleString()}`,
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
                            dataSource={courses}
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
                                ${total.toLocaleString()}
                            </Col>
                            <Col span={12}>Shipping Fee</Col>
                            <Col span={12} style={{ textAlign: 'right' }}>
                                $0
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
                                ${total.toLocaleString()}
                            </Col>
                        </Row>
                        <Button
                            type="primary"
                            size="large"
                            style={{ marginTop: '20px', float: 'right' }}
                        >
                            Checkout
                        </Button>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default StudentCartPage
