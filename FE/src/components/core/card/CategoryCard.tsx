import React, { useEffect } from 'react'

import { Card, Typography } from 'antd'

import { RocketOutlined } from '@ant-design/icons'

import CategoryService from '@/services/category'

import './styles/CategoryCard.css'

const { Title, Text } = Typography

const CategoryCard = ({ category }: any) => {
    const [total, setTotal] = React.useState(0)

    const fetchTotalCourses = async () => {
        try {
            const response = await CategoryService.getCoursesInCategory(
                category.id
            )
            setTotal(response.total)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchTotalCourses()
    }, [])

    return (
        <Card hoverable className="category-card">
            <div className="category-icon">
                <RocketOutlined />
            </div>
            <Title level={4} style={{ marginBottom: '8px' }}>
                {category.name}
            </Title>
            <Text type="secondary">{total} khóa học</Text>
        </Card>
    )
}

export default CategoryCard
