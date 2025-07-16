import { Button, Image, Popconfirm, Space, Tag } from 'antd'

import { DATE_TIME_FORMAT } from '@/constants/date'
import { formatDateTime, formatPrice } from '@/utils/format'
import { DeleteOutlined, FormOutlined, QuestionCircleOutlined } from '@ant-design/icons'

export const RESULT_QUIZ_COLUMNS: any = [
    {
        title: 'Date Time',
        dataIndex: 'submitted_at',
        key: 'submitted_at',
        align: 'left' as const,
        render: (text: string) => {
            return <div>{formatDateTime(text, DATE_TIME_FORMAT)}</div>
        },
    },
    {
        title: 'Total Question',
        dataIndex: 'total_questions',
        key: 'total_questions',
        align: 'center' as const,
    },
    {
        title: 'Correct Answer',
        dataIndex: 'correct_answers',
        key: 'correct_answers',
        align: 'center' as const,
    },
    {
        title: 'Result',
        dataIndex: 'is_pass',
        key: 'is_pass',
        align: 'center' as const,
        render: (text: any) => {
            return (
                <Tag color={text ? 'green' : 'error'}>
                    {text ? 'Pass' : 'Fail'}
                </Tag>
            )
        },
    },
]

export const getManageCourseColumns = (
    openModalUpdate: (record: any) => void,
    openModalDelete: (record: any) => void,
    categoryOptions: any[] = []
) => [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        align: 'left',
    },
    {
        title: 'Thumbnail',
        dataIndex: 'thumbnail',
        key: 'thumbnail',
        align: 'center',
        render: (text: any) => {
            return (
                <Image
                    src={text}
                    alt="course"
                    style={{ width: '80px', height: 'auto' }}
                />
            )
        },
    },
    {
        title: 'Category',
        dataIndex: 'category_id',
        key: 'category_id',
        align: 'center',
        render: (text: any) => {
            const currentCategory = categoryOptions.filter((category: any) => category.id === text)
            console.log(currentCategory)
            return (
                <div>
                    {currentCategory[0]?.name}
                </div>
            )
        },
    },
    {
        title: 'Students',
        dataIndex: 'enrollments_count',
        key: 'enrollments_count',
        align: 'center',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        align: 'center',
        render: (text: any) => {
            return (
                <div>
                    {formatPrice(text)}
                </div>
            )
        },
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: (text: any) => {
            return (
                <div>
                    {text === 'published' ? (
                        <Tag color="green">Published</Tag>
                    ) : text === 'archived' ? (
                        <Tag color="orange">Archived</Tag>
                    ) : (
                        <Tag color="default">Draft</Tag>
                    )}
                </div>

            )
        },
    },
    {
        title: 'Action',
        key: 'action',
        align: 'center',
        width: 150,
        render: (record: any) => (
            <Space>
                <Button
                    type="primary"
                    size="small"
                    icon={<FormOutlined />}
                    onClick={(e) => {
                        e.stopPropagation()
                        openModalUpdate(record)
                    }}
                />
                <Popconfirm
                    title="Delete the course"
                    description={`Are you sure to delete this course`}
                    onConfirm={(e) => {
                        // @ts-ignore
                        e.stopPropagation()
                        openModalDelete(record)
                    }}
                    onCancel={() => {}}
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    okText="Delete"
                    cancelText="Cancel"
                >
                    <Button
                        danger
                        size="small"
                        icon={<DeleteOutlined />}
                    />
                </Popconfirm>
            </Space>
        ),
    },
]
