import { Button, Image, Popconfirm, Space, Tag } from 'antd'

import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    EditOutlined,
    FormOutlined,
    HistoryOutlined,
    InteractionOutlined,
    PlusOutlined,
    QuestionCircleOutlined,
    ReloadOutlined,
    UploadOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

import { DATE_TIME_FORMAT } from '@/constants/date'
import { BASE_IMAGE_URL } from '@/constants/image'
import { formatDateTime, formatPrice } from '@/utils/format'
import { getRoleName, getStatusNameAndColor } from '@/utils/get'

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
    publishCourse: (record: any) => void,
    archiveCourse: (record: any) => void,
    categoryOptions: any[] = []
) => [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        fixed: 'left',
        render: (text: any) => {
            return (
                <Link to={`/instructor/courses/${text}`} target="_blank">
                    {text}
                </Link>
            )
        },
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
                    src={`${BASE_IMAGE_URL}${text}`}
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
            const currentCategory = categoryOptions.filter(
                (category: any) => category.id === text
            )
            return <div>{currentCategory[0]?.name}</div>
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
            return <div>{formatPrice(text)}</div>
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
        width: 200,
        fixed: 'right',
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
                    <Button danger size="small" icon={<DeleteOutlined />} />
                </Popconfirm>
                <Popconfirm
                    title="Publish the course"
                    description={`Are you sure to publish this course`}
                    onConfirm={(e) => {
                        // @ts-ignore
                        e.stopPropagation()
                        publishCourse(record)
                    }}
                    onCancel={() => {}}
                    icon={<QuestionCircleOutlined style={{ color: 'green' }} />}
                    okText="Publish"
                    cancelText="Cancel"
                >
                    <Button
                        variant="solid"
                        size="small"
                        color="green"
                        icon={<UploadOutlined />}
                        disabled={record.status === 'published'}
                    />
                </Popconfirm>
                <Popconfirm
                    title="Archive the course"
                    description={`Are you sure to archive this course`}
                    onConfirm={(e) => {
                        // @ts-ignore
                        e.stopPropagation()
                        archiveCourse(record)
                    }}
                    onCancel={() => {}}
                    icon={
                        <QuestionCircleOutlined style={{ color: 'orange' }} />
                    }
                    okText="Archive"
                    cancelText="Cancel"
                >
                    <Button
                        variant="solid"
                        size="small"
                        color="orange"
                        icon={<HistoryOutlined />}
                        disabled={record.status === 'archived'}
                    />
                </Popconfirm>
            </Space>
        ),
    },
]

export const getAdminManageCourseColumns = (
    openModalDelete: (record: any) => void,
    publishCourse: (record: any) => void,
    archiveCourse: (record: any) => void
) => [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        fixed: 'left',
        render: (text: any) => {
            return (
                <Link to={`/instructor/courses/${text}`} target="_blank">
                    {text}
                </Link>
            )
        },
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
                    src={`${BASE_IMAGE_URL}${text}`}
                    alt="course"
                    style={{ width: '80px', height: 'auto' }}
                />
            )
        },
    },
    {
        title: 'Category',
        dataIndex: 'category_name',
        key: 'category_name',
        align: 'center',
    },
    {
        title: 'Instructor',
        dataIndex: 'instructor_full_name',
        key: 'instructor_full_name',
        align: 'center',
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
            return <div>{formatPrice(text)}</div>
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
        width: 200,
        fixed: 'right',
        render: (record: any) => (
            <Space>
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
                    <Button danger size="small" icon={<DeleteOutlined />} />
                </Popconfirm>
                <Popconfirm
                    title="Publish the course"
                    description={`Are you sure to publish this course`}
                    onConfirm={(e) => {
                        // @ts-ignore
                        e.stopPropagation()
                        publishCourse(record)
                    }}
                    onCancel={() => {}}
                    icon={<QuestionCircleOutlined style={{ color: 'green' }} />}
                    okText="Publish"
                    cancelText="Cancel"
                >
                    <Button
                        variant="solid"
                        size="small"
                        color="green"
                        icon={<UploadOutlined />}
                        disabled={record.status === 'published'}
                    />
                </Popconfirm>
                <Popconfirm
                    title="Archive the course"
                    description={`Are you sure to archive this course`}
                    onConfirm={(e) => {
                        // @ts-ignore
                        e.stopPropagation()
                        archiveCourse(record)
                    }}
                    onCancel={() => {}}
                    icon={
                        <QuestionCircleOutlined style={{ color: 'orange' }} />
                    }
                    okText="Archive"
                    cancelText="Cancel"
                >
                    <Button
                        variant="solid"
                        size="small"
                        color="orange"
                        icon={<HistoryOutlined />}
                        disabled={record.status === 'archived'}
                    />
                </Popconfirm>
            </Space>
        ),
    },
]

export const getManageLessonColumns = (
    openModalUpdate: (record: any) => void,
    openModalDelete: (record: any) => void,
    openModalCreate: (record: any) => void
) => [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        fixed: 'left',
        width: 70,
        render: (text: any) => {
            return (
                <Link to={`/instructor/courses/${text}`} target="_blank">
                    {text}
                </Link>
            )
        },
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        align: 'left',
    },
    {
        title: 'Video url',
        dataIndex: 'video_url',
        key: 'video_url',
        align: 'center',
    },
    {
        title: 'Content',
        dataIndex: 'content',
        key: 'content',
        align: 'left',
    },
    {
        title: 'Order number',
        dataIndex: 'order_number',
        key: 'order_number',
        align: 'center',
    },
    {
        title: 'Action',
        key: 'action',
        align: 'center',
        width: 120,
        fixed: 'right',
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
                    title="Delete the lesson"
                    description={`Are you sure to delete this lesson`}
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
                    <Button danger size="small" icon={<DeleteOutlined />} />
                </Popconfirm>
                <Button
                    variant="outlined"
                    color="green"
                    size="small"
                    icon={<PlusOutlined />}
                    onClick={(e) => {
                        e.stopPropagation()
                        openModalCreate(record)
                    }}
                />
            </Space>
        ),
    },
]

export const getManageQuizColumns = (
    openModalUpdate: (record: any) => void,
    openModalDelete: (record: any) => void,
    openModalCreate: (record: any) => void
) => [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        fixed: 'left',
        width: 70,
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        align: 'left',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        align: 'left',
    },
    {
        title: 'Action',
        key: 'action',
        align: 'center',
        width: 120,
        fixed: 'right',
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
                    title="Delete the quiz"
                    description={`Are you sure to delete this quiz`}
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
                    <Button danger size="small" icon={<DeleteOutlined />} />
                </Popconfirm>
                <Button
                    variant="solid"
                    color="green"
                    size="small"
                    icon={<EditOutlined />}
                    onClick={(e) => {
                        e.stopPropagation()
                        openModalCreate(record)
                    }}
                />
            </Space>
        ),
    },
]

export const getManageQuestionColumns = (
    openModalUpdate: (record: any) => void,
    openModalDelete: (record: any) => void,
    openModalCreate: (record: any) => void
) => [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        fixed: 'left',
        width: 70,
    },
    {
        title: 'Question Text',
        dataIndex: 'question_text',
        key: 'question_text',
        align: 'left',
    },
    {
        title: 'Question Type',
        dataIndex: 'question_type',
        key: 'question_type',
        align: 'center',
        width: 150,
    },
    {
        title: 'Action',
        key: 'action',
        align: 'center',
        width: 120,
        fixed: 'right',
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
                    title="Delete the question and its answers"
                    description={`Are you sure to delete this question`}
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
                    <Button danger size="small" icon={<DeleteOutlined />} />
                </Popconfirm>
                <Button
                    color="green"
                    variant="outlined"
                    size="small"
                    icon={<PlusOutlined />}
                    onClick={(e) => {
                        e.stopPropagation()
                        openModalCreate(record)
                    }}
                />
            </Space>
        ),
    },
]

export const MANAGE_STUDENT_COLUMNS: any = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        fixed: 'left',
        width: 70,
    },
    {
        title: 'Full name',
        dataIndex: 'full_name',
        key: 'full_name',
        align: 'left',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        align: 'left',
    },
    {
        title: 'Phone number',
        dataIndex: 'phone',
        key: 'phone',
        align: 'center',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        align: 'center',
    },
    {
        title: 'Date of birth',
        dataIndex: 'date_of_birth',
        key: 'date_of_birth',
        align: 'center',
        render: (text: any) => {
            return <div>{text ? formatDateTime(text, 'DD/MM/YYYY') : ''}</div>
        },
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        align: 'center' as const,
        render: (text: any) => {
            return (
                <Tag color={getStatusNameAndColor(text).color}>
                    {getStatusNameAndColor(text).name}
                </Tag>
            )
        },
    },
]

export const getManageUserColumns: any = (
    onEdit: (record: any) => void,
    onDelete: (record: any) => void,
    onResetPassword: (record: any) => void
) => [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        fixed: 'left',
        width: 70,
    },
    {
        title: 'Họ và tên',
        dataIndex: 'full_name',
        key: 'full_name',
        align: 'left',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        align: 'left',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone',
        key: 'phone',
        align: 'center',
    },
    {
        title: 'Vai trò',
        dataIndex: 'role',
        key: 'role',
        align: 'center',
        render: (text: any) => {
            return <div>{getRoleName(text)}</div>
        },
    },
    {
        title: 'Giới tính',
        dataIndex: 'gender',
        key: 'gender',
        align: 'center',
    },
    {
        title: 'Ngày sinh',
        dataIndex: 'date_of_birth',
        key: 'date_of_birth',
        align: 'center',
        render: (text: any) => {
            return <div>{text ? formatDateTime(text, 'DD/MM/YYYY') : ''}</div>
        },
    },
    {
        title: 'Ví tiền',
        dataIndex: 'money',
        key: 'money',
        align: 'center',
        render: (text: any) => {
            return <div>{text ? formatPrice(text) : ''}</div>
        },
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        align: 'center' as const,
        render: (text: any) => {
            return (
                <Tag color={getStatusNameAndColor(text).color}>
                    {getStatusNameAndColor(text).name}
                </Tag>
            )
        },
    },
    {
        title: 'Hành động',
        key: 'action',
        align: 'center',
        width: 150,
        fixed: 'right',
        render: (record: any) => (
            <Space
                style={{
                    visibility: record.machineId !== '-' ? 'visible' : 'hidden',
                }}
            >
                <Button
                    type="primary"
                    size="small"
                    icon={<FormOutlined />}
                    style={{ borderRadius: 8 }}
                    onClick={() => onEdit(record)}
                />
                <Button
                    danger
                    size="small"
                    icon={<DeleteOutlined />}
                    style={{ borderRadius: 8 }}
                    onClick={() => onDelete(record)}
                />
                <Button
                    size="small"
                    icon={<InteractionOutlined />}
                    style={{ borderRadius: 8 }}
                    onClick={() => onResetPassword(record)}
                />
                <Button
                    variant="outlined"
                    size="small"
                    color="green"
                    icon={<CheckCircleOutlined />}
                    style={{ borderRadius: 8 }}
                    onClick={() => onResetPassword(record)}
                />
                <Button
                    variant="outlined"
                    size="small"
                    color="red"
                    icon={<CloseCircleOutlined />}
                    style={{ borderRadius: 8 }}
                    onClick={() => onResetPassword(record)}
                />
            </Space>
        ),
    },
]

export const MANAGE_TRANSACTION_COLUMNS: any = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        fixed: 'left',
        width: 70,
    },
    {
        title: 'Người đăng ký',
        dataIndex: 'user',
        key: 'user',
        align: 'center',
    },
    {
        title: 'Khóa học',
        dataIndex: 'course',
        key: 'course',
        align: 'center',
    },
    {
        title: 'Giá',
        dataIndex: 'original_price',
        key: 'original_price',
        align: 'center',
        render: (text: any) => {
            return <div>{text ? formatPrice(text) : ''}</div>
        },
    },
    {
        title: 'Phương thức thanh toán',
        dataIndex: 'payment_method',
        key: 'payment_method',
        align: 'center',
    },
    {
        title: 'Trạng thái thanh toán',
        dataIndex: 'payment_status',
        key: 'payment_status',
        align: 'center',
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'created_at',
        key: 'created_at',
        align: 'center',
        render: (text: any) => {
            return (
                <div>{text ? formatDateTime(text, DATE_TIME_FORMAT) : ''}</div>
            )
        },
    },
]
