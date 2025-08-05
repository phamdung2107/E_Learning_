import { Button, Image, Popconfirm, Space, Tag, Tooltip } from 'antd'

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
    UploadOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

import { DATE_TIME_FORMAT } from '@/constants/date'
import { BASE_IMAGE_URL } from '@/constants/image'
import { formatDateTime, formatPrice } from '@/utils/format'
import {
    getPaymentMethodName,
    getPaymentStatusName,
    getRoleName,
    getStatusNameAndColor,
    getTypeTransaction,
} from '@/utils/get'

export const RESULT_QUIZ_COLUMNS: any = [
    {
        title: 'Thời gian nộp',
        dataIndex: 'submitted_at',
        key: 'submitted_at',
        align: 'left' as const,
        render: (text: string) => {
            return <div>{formatDateTime(text, DATE_TIME_FORMAT)}</div>
        },
    },
    {
        title: 'Tổng số câu hỏi',
        dataIndex: 'total_questions',
        key: 'total_questions',
        align: 'center' as const,
    },
    {
        title: 'Số câu đúng',
        dataIndex: 'correct_answers',
        key: 'correct_answers',
        align: 'center' as const,
    },
    {
        title: 'Kết quả',
        dataIndex: 'is_pass',
        key: 'is_pass',
        align: 'center' as const,
        render: (text: any) => {
            return (
                <Tag color={text ? 'green' : 'error'}>
                    {text ? 'Đạt' : 'Không đạt'}
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
        title: 'Tên khóa học',
        dataIndex: 'title',
        key: 'title',
        align: 'left',
        render: (_: any, record: any) => {
            return (
                <Link to={`/instructor/courses/${record.id}`} target="_blank">
                    {record.title}
                </Link>
            )
        },
        fixed: 'left',
    },
    {
        title: 'Ảnh đại diện',
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
        title: 'Danh mục',
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
        title: 'Số học viên',
        dataIndex: 'enrollments_count',
        key: 'enrollments_count',
        align: 'center',
    },
    {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description',
        render: (text: any) => (
            <div
                style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}
                dangerouslySetInnerHTML={{ __html: text }}
            />
        ),
    },
    {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
        align: 'center',
        render: (text: any) => {
            return <div>{formatPrice(text)}</div>
        },
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: (text: any) => {
            return (
                <div>
                    {text === 'published' ? (
                        <Tag color="green">Đã xuất bản</Tag>
                    ) : text === 'archived' ? (
                        <Tag color="orange">Đã lưu trữ</Tag>
                    ) : (
                        <Tag color="default">Bản nháp</Tag>
                    )}
                </div>
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
            <Space>
                <Tooltip title="Sửa khóa học" placement="bottom">
                    <Button
                        type="primary"
                        size="small"
                        icon={<FormOutlined />}
                        onClick={(e) => {
                            e.stopPropagation()
                            openModalUpdate(record)
                        }}
                    />
                </Tooltip>
                <Tooltip title="Xóa khóa học" placement="bottom">
                    <Popconfirm
                        title="Xóa khóa học"
                        description={`Bạn có chắc chắn muốn xóa khóa học này?`}
                        onConfirm={(e) => {
                            // @ts-ignore
                            e.stopPropagation()
                            openModalDelete(record)
                        }}
                        onCancel={() => {}}
                        icon={
                            <QuestionCircleOutlined style={{ color: 'red' }} />
                        }
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button danger size="small" icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Tooltip>
                <Tooltip title="Đăng tải khóa học" placement="bottom">
                    <Popconfirm
                        title="Đăng tải khóa học"
                        description={`Bạn có chắc chắn muốn xuất bản khóa học này?`}
                        onConfirm={(e) => {
                            // @ts-ignore
                            e.stopPropagation()
                            publishCourse(record)
                        }}
                        onCancel={() => {}}
                        icon={
                            <QuestionCircleOutlined
                                style={{ color: 'green' }}
                            />
                        }
                        okText="Đăng tải"
                        cancelText="Hủy"
                    >
                        <Button
                            variant="solid"
                            size="small"
                            color="green"
                            icon={<UploadOutlined />}
                            disabled={record.status === 'published'}
                        />
                    </Popconfirm>
                </Tooltip>
                <Tooltip title="Lưu trữ khóa học" placement="bottom">
                    <Popconfirm
                        title="Lưu trữ khóa học"
                        description={`Bạn có chắc chắn muốn lưu trữ khóa học này?`}
                        onConfirm={(e) => {
                            // @ts-ignore
                            e.stopPropagation()
                            archiveCourse(record)
                        }}
                        onCancel={() => {}}
                        icon={
                            <QuestionCircleOutlined
                                style={{ color: 'orange' }}
                            />
                        }
                        okText="Lưu trữ"
                        cancelText="Hủy"
                    >
                        <Button
                            variant="solid"
                            size="small"
                            color="orange"
                            icon={<HistoryOutlined />}
                            disabled={record.status === 'archived'}
                        />
                    </Popconfirm>
                </Tooltip>
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
        title: 'Tên khóa học',
        dataIndex: 'title',
        key: 'title',
        align: 'left',
    },
    {
        title: 'Ảnh đại diện',
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
        title: 'Danh mục',
        dataIndex: 'category_name',
        key: 'category_name',
        align: 'center',
    },
    {
        title: 'Giảng viên',
        dataIndex: 'instructor_full_name',
        key: 'instructor_full_name',
        align: 'center',
    },
    {
        title: 'Số học viên',
        dataIndex: 'enrollments_count',
        key: 'enrollments_count',
        align: 'center',
    },
    {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
        align: 'center',
        render: (text: any) => {
            return <div>{formatPrice(text)}</div>
        },
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: (text: any) => {
            return (
                <div>
                    {text === 'published' ? (
                        <Tag color="green">Đã xuất bản</Tag>
                    ) : text === 'archived' ? (
                        <Tag color="orange">Đã lưu trữ</Tag>
                    ) : (
                        <Tag color="default">Bản nháp</Tag>
                    )}
                </div>
            )
        },
    },
    {
        title: 'Hành động',
        key: 'action',
        align: 'center',
        width: 200,
        fixed: 'right',
        render: (record: any) => (
            <Space>
                <Tooltip title="Xóa khóa học" placement="bottom">
                    <Popconfirm
                        title="Xóa khóa học"
                        description={`Bạn có chắc chắn muốn xóa khóa học này?`}
                        onConfirm={(e) => {
                            // @ts-ignore
                            e.stopPropagation()
                            openModalDelete(record)
                        }}
                        onCancel={() => {}}
                        icon={
                            <QuestionCircleOutlined style={{ color: 'red' }} />
                        }
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button danger size="small" icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Tooltip>
                <Tooltip title="Đăng tải khóa học" placement="bottom">
                    <Popconfirm
                        title="Đăng tải khóa học"
                        description={`Bạn có chắc chắn muốn xuất bản khóa học này?`}
                        onConfirm={(e) => {
                            // @ts-ignore
                            e.stopPropagation()
                            publishCourse(record)
                        }}
                        onCancel={() => {}}
                        icon={
                            <QuestionCircleOutlined
                                style={{ color: 'green' }}
                            />
                        }
                        okText="Đăng tải"
                        cancelText="Hủy"
                    >
                        <Button
                            variant="solid"
                            size="small"
                            color="green"
                            icon={<UploadOutlined />}
                            disabled={record.status === 'published'}
                        />
                    </Popconfirm>
                </Tooltip>
                <Tooltip title="Lưu trữ khóa học" placement="bottom">
                    <Popconfirm
                        title="Lưu trữ khóa học"
                        description={`Bạn có chắc chắn muốn lưu trữ khóa học này?`}
                        onConfirm={(e) => {
                            // @ts-ignore
                            e.stopPropagation()
                            archiveCourse(record)
                        }}
                        onCancel={() => {}}
                        icon={
                            <QuestionCircleOutlined
                                style={{ color: 'orange' }}
                            />
                        }
                        okText="Lưu trữ"
                        cancelText="Hủy"
                    >
                        <Button
                            variant="solid"
                            size="small"
                            color="orange"
                            icon={<HistoryOutlined />}
                            disabled={record.status === 'archived'}
                        />
                    </Popconfirm>
                </Tooltip>
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
        title: 'Tên bài học',
        dataIndex: 'title',
        key: 'title',
        align: 'left',
    },
    {
        title: 'Đường dẫn video',
        dataIndex: 'video_url',
        key: 'video_url',
        align: 'center',
    },
    {
        title: 'Nội dung',
        dataIndex: 'content',
        key: 'content',
        align: 'left',
        render: (text: any) => (
            <div
                style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}
                dangerouslySetInnerHTML={{ __html: text }}
            />
        ),
    },
    {
        title: 'Thứ tự',
        dataIndex: 'order_number',
        key: 'order_number',
        align: 'center',
    },
    {
        title: 'Hành động',
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
                    title="Xóa bài học"
                    description={`Bạn có chắc chắn muốn xóa bài học này?`}
                    onConfirm={(e) => {
                        // @ts-ignore
                        e.stopPropagation()
                        openModalDelete(record)
                    }}
                    onCancel={() => {}}
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    okText="Xóa"
                    cancelText="Hủy"
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
        title: 'Tên quiz',
        dataIndex: 'title',
        key: 'title',
        align: 'left',
    },
    {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description',
        align: 'left',
    },
    {
        title: 'Hành động',
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
                    title="Xóa quiz"
                    description={`Bạn có chắc chắn muốn xóa quiz này?`}
                    onConfirm={(e) => {
                        // @ts-ignore
                        e.stopPropagation()
                        openModalDelete(record)
                    }}
                    onCancel={() => {}}
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    okText="Xóa"
                    cancelText="Hủy"
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
        title: 'Nội dung câu hỏi',
        dataIndex: 'question_text',
        key: 'question_text',
        align: 'left',
    },
    {
        title: 'Loại câu hỏi',
        dataIndex: 'question_type',
        key: 'question_type',
        align: 'center',
        width: 150,
    },
    {
        title: 'Hành động',
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
                    title="Xóa câu hỏi và đáp án"
                    description={`Bạn có chắc chắn muốn xóa câu hỏi này?`}
                    onConfirm={(e) => {
                        // @ts-ignore
                        e.stopPropagation()
                        openModalDelete(record)
                    }}
                    onCancel={() => {}}
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    okText="Xóa"
                    cancelText="Hủy"
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
        title: 'Họ và tên',
        dataIndex: 'full_name',
        key: 'full_name',
        align: 'left',
        fixed: 'left',
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
]

export const getManageUserColumns: any = (
    onEdit: (record: any) => void,
    onDelete: (record: any) => void,
    onResetPassword: (record: any) => void
) => [
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
            <Space>
                <Tooltip title="Sửa người dùng" placement="bottom">
                    <Button
                        type="primary"
                        size="small"
                        icon={<FormOutlined />}
                        style={{ borderRadius: 8 }}
                        onClick={() => onEdit(record)}
                    />
                </Tooltip>
                <Tooltip title="Xóa người dùng" placement="bottom">
                    <Button
                        danger
                        size="small"
                        icon={<DeleteOutlined />}
                        style={{ borderRadius: 8 }}
                        onClick={() => onDelete(record)}
                    />
                </Tooltip>
                <Tooltip title="Đặt lại mật khẩu" placement="bottom">
                    <Button
                        size="small"
                        icon={<InteractionOutlined />}
                        style={{ borderRadius: 8 }}
                        onClick={() => onResetPassword(record)}
                    />
                </Tooltip>
            </Space>
        ),
    },
]

export const getManageTransactionColumns = (
    onAccept: (record: any) => void,
    onReject: (record: any) => void
): any => [
    {
        title: 'Người giao dịch',
        dataIndex: 'user_email',
        key: 'user_email',
        align: 'left',
    },
    {
        title: 'Mã giao dịch',
        dataIndex: 'transaction_id',
        key: 'transaction_id',
        align: 'center',
        fixed: 'left',
    },
    {
        title: 'Tài khoản ngân hàng',
        dataIndex: 'bank_account',
        key: 'bank_account',
        align: 'center',
    },
    {
        title: 'Loại giao dịch',
        dataIndex: 'type',
        key: 'type',
        align: 'center',
        render: (text: any) => {
            return <div>{text ? getTypeTransaction(text) : ''}</div>
        },
    },
    {
        title: 'Số tiền',
        dataIndex: 'amount',
        key: 'amount',
        align: 'center',
        render: (text: any) => {
            return <div>{text ? formatPrice(text) : ''}</div>
        },
    },
    {
        title: 'Trạng thái giao dịch',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: (text: any) => {
            if (text === 'pending') {
                return <Tag color="orange">{getPaymentStatusName(text)}</Tag>
            } else if (text === 'completed') {
                return <Tag color="green">{getPaymentStatusName(text)}</Tag>
            } else if (text === 'failed') {
                return <Tag color="red">{getPaymentStatusName(text)}</Tag>
            }
        },
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'created_at',
        key: 'created_at',
        align: 'center',
        render: (text: any) => {
            return <div>{text ? text.replace("'\'", '') : ''}</div>
        },
    },
    {
        title: 'Hành động',
        key: 'action',
        align: 'center',
        width: 150,
        fixed: 'right',
        render: (record: any) => {
            if (record.type === 'withdraw') {
                return (
                    <Space>
                        <Tooltip title="Chấp nhận rút tiền" placement="bottom">
                            <Popconfirm
                                title="Chấp nhận rút tiền"
                                description={`Bạn cho phép giảng viên này rút tiền?`}
                                onConfirm={(e) => {
                                    // @ts-ignore
                                    e.stopPropagation()
                                    onAccept(record)
                                }}
                                onCancel={() => {}}
                                icon={
                                    <CheckCircleOutlined
                                        style={{ color: 'green' }}
                                    />
                                }
                                okText="OK"
                                cancelText="Hủy"
                            >
                                <Button
                                    disabled={record.status !== 'pending'}
                                    variant="outlined"
                                    color="green"
                                    size="small"
                                    icon={<CheckCircleOutlined />}
                                />
                            </Popconfirm>
                        </Tooltip>
                        <Tooltip title="Từ chối rút tiền" placement="bottom">
                            <Popconfirm
                                title="Từ chối rút tiền"
                                description={`Bạn không muốn cho giảng viên này rút tiền?`}
                                onConfirm={(e) => {
                                    // @ts-ignore
                                    e.stopPropagation()
                                    onReject(record)
                                }}
                                onCancel={() => {}}
                                icon={
                                    <CloseCircleOutlined
                                        style={{ color: 'red' }}
                                    />
                                }
                                okText="OK"
                                cancelText="Hủy"
                            >
                                <Button
                                    disabled={record.status !== 'pending'}
                                    danger
                                    size="small"
                                    icon={<CloseCircleOutlined />}
                                />
                            </Popconfirm>
                        </Tooltip>
                    </Space>
                )
            }
        },
    },
]

export const MANAGE_TRANSACTION_COLUMNS: any = [
    {
        title: 'Người giao dịch',
        dataIndex: 'user_email',
        key: 'user_email',
        align: 'left',
    },
    {
        title: 'Mã giao dịch',
        dataIndex: 'transaction_id',
        key: 'transaction_id',
        align: 'left',
        fixed: 'left',
    },
    {
        title: 'Tài khoản ngân hàng',
        dataIndex: 'bank_account',
        key: 'bank_account',
        align: 'center',
    },
    {
        title: 'Loại giao dịch',
        dataIndex: 'type',
        key: 'type',
        align: 'center',
        render: (text: any) => {
            return <div>{text ? getTypeTransaction(text) : ''}</div>
        },
    },
    {
        title: 'Số tiền',
        dataIndex: 'amount',
        key: 'amount',
        align: 'center',
        render: (text: any) => {
            return <div>{text ? formatPrice(text) : ''}</div>
        },
    },
    {
        title: 'Trạng thái giao dịch',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: (text: any) => {
            return <div>{text && getPaymentStatusName(text)}</div>
        },
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'created_at',
        key: 'created_at',
        align: 'center',
        render: (text: any) => {
            return <div>{text ? text.replace("'\'", '') : ''}</div>
        },
    },
]

export const STUDENT_MANAGE_TRANSACTION_COLUMNS: any = [
    {
        title: 'Mã giao dịch',
        dataIndex: 'transaction_id',
        key: 'transaction_id',
        align: 'left',
        fixed: 'left',
    },
    {
        title: 'Tài khoản ngân hàng',
        dataIndex: 'bank_account',
        key: 'bank_account',
        align: 'center',
    },
    {
        title: 'Loại giao dịch',
        dataIndex: 'type',
        key: 'type',
        align: 'center',
        render: (text: any) => {
            return <div>{text ? getTypeTransaction(text) : ''}</div>
        },
    },
    {
        title: 'Số tiền',
        dataIndex: 'amount',
        key: 'amount',
        align: 'center',
        render: (text: any) => {
            return <div>{text ? formatPrice(text) : ''}</div>
        },
    },
    {
        title: 'Trạng thái giao dịch',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: (text: any) => {
            return <div>{text && getPaymentStatusName(text)}</div>
        },
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'created_at',
        key: 'created_at',
        align: 'center',
        render: (text: any) => {
            return <div>{text ? text.replace("'\'", '') : ''}</div>
        },
    },
]

export const getManageEventColumns: any = (
    onEdit: (record: any) => void,
    onDelete: (record: any) => void
) => [
    {
        title: 'Tên',
        dataIndex: 'name',
        key: 'name',
        align: 'left',
    },
    {
        title: 'Nội dung',
        dataIndex: 'content',
        key: 'content',
        align: 'left',
    },
    {
        title: 'Phần trăm giảm giá',
        dataIndex: 'bonus_percent',
        key: 'bonus_percent',
        align: 'center',
        render: (text: any) => {
            return <div>{text ? `${text}%` : ''}</div>
        },
    },
    {
        title: 'Ngày bắt đầu',
        dataIndex: 'start_time',
        key: 'start_time',
        align: 'center',
        render: (text: any) => {
            return <div>{formatDateTime(text, DATE_TIME_FORMAT)}</div>
        },
    },
    {
        title: 'Ngày kết thúc',
        dataIndex: 'end_time',
        key: 'end_time',
        align: 'center',
        render: (text: any) => {
            return <div>{formatDateTime(text, DATE_TIME_FORMAT)}</div>
        },
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
    },
    {
        title: 'Hành động',
        key: 'action',
        align: 'center',
        width: 150,
        fixed: 'right',
        render: (record: any) => (
            <Space>
                <Tooltip title="Sửa hoạt động" placement="bottom">
                    <Button
                        type="primary"
                        size="small"
                        icon={<FormOutlined />}
                        style={{ borderRadius: 8 }}
                        onClick={() => onEdit(record)}
                    />
                </Tooltip>
                <Tooltip title="Xóa hoạt động" placement="bottom">
                    <Popconfirm
                        title="Xóa hoạt động"
                        description={`Bạn có chắc chắn muốn xóa hoạt động này?`}
                        onConfirm={(e) => {
                            // @ts-ignore
                            e.stopPropagation()
                            onDelete(record)
                        }}
                        onCancel={() => {}}
                        icon={
                            <QuestionCircleOutlined style={{ color: 'red' }} />
                        }
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button danger size="small" icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Tooltip>
            </Space>
        ),
    },
]
