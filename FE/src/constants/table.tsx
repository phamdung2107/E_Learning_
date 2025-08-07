import { Button, Image, Popconfirm, Space, Switch, Tag, Tooltip } from 'antd'

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
    getEventStatusName,
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
                        <Tag color="red">Đã lưu trữ</Tag>
                    ) : text === 'draft' ? (
                        <Tag color="default">Bản nháp</Tag>
                    ) : (
                        <Tag color="orange">Đang xử lý</Tag>
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
                <Tooltip
                    title="Gửi yêu cầu đăng tải khóa học"
                    placement="bottom"
                >
                    <Popconfirm
                        title="Gửi yêu cầu đăng tải khóa học"
                        description={`Bạn có muốn gửi yêu cầu để đăng tải khóa học này không?`}
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
                        okText="OK"
                        cancelText="Hủy"
                    >
                        <Button
                            variant="solid"
                            size="small"
                            color="green"
                            icon={<UploadOutlined />}
                            disabled={
                                record.status === 'pending' ||
                                record.status === 'published'
                            }
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
    publishCourse: (record: any) => void
) => [
    {
        title: 'Tên khóa học',
        dataIndex: 'title',
        key: 'title',
        align: 'left',
        fixed: 'left',
        render: (text: any) => {
            return (
                <div>
                    <Link to={`/admin/courses/${text}`} target="_blank">
                        {text}
                    </Link>
                </div>
            )
        },
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
                        <Tag color="red">Đã lưu trữ</Tag>
                    ) : text === 'draft' ? (
                        <Tag color="default">Bản nháp</Tag>
                    ) : (
                        <Tag color="orange">Đang xử lý</Tag>
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
                        description={`Bạn có chắc chắn muốn đăng tải khóa học này?`}
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
            </Space>
        ),
    },
]

export const getManageLessonColumns = (
    openModalUpdate: (record: any) => void,
    openModalDelete: (record: any) => void,
    openModalCreate: (record: any) => void,
    role: string = 'instructor'
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
        width: 121,
    },
    {
        title: 'Hành động',
        key: 'action',
        align: 'center',
        width: 120,
        fixed: 'right',
        hidden: role !== 'instructor',
        render: (record: any) => (
            <Space>
                <Tooltip title="Sửa bài học" placement="bottom">
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
                <Tooltip title="Xóa bài học" placement="bottom">
                    <Popconfirm
                        title="Xóa bài học"
                        description={`Bạn có chắc chắn muốn xóa bài học này?`}
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
                <Tooltip
                    title="Tạo bài kiểm tra cho bài học"
                    placement="bottom"
                >
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
                </Tooltip>
            </Space>
        ),
    },
]

export const getManageQuizColumns = (
    openModalUpdate: (record: any) => void,
    openModalDelete: (record: any) => void,
    openModalCreate: (record: any) => void,
    role: string = 'instructor'
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
                {role === 'instructor' && (
                    <>
                        <Tooltip title="Sửa bài kiểm tra" placement="bottom">
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
                        <Tooltip title="Xóa bài kiểm tra" placement="bottom">
                            <Popconfirm
                                title="Xóa quiz"
                                description={`Bạn có chắc chắn muốn xóa quiz này?`}
                                onConfirm={(e) => {
                                    // @ts-ignore
                                    e.stopPropagation()
                                    openModalDelete(record)
                                }}
                                onCancel={() => {}}
                                icon={
                                    <QuestionCircleOutlined
                                        style={{ color: 'red' }}
                                    />
                                }
                                okText="Xóa"
                                cancelText="Hủy"
                            >
                                <Button
                                    danger
                                    size="small"
                                    icon={<DeleteOutlined />}
                                />
                            </Popconfirm>
                        </Tooltip>
                    </>
                )}
                <Tooltip title="Xem danh sách câu hỏi" placement="bottom">
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
                </Tooltip>
            </Space>
        ),
    },
]

export const getManageQuestionColumns = (
    openModalUpdate: (record: any) => void,
    openModalDelete: (record: any) => void,
    openModalCreate: (record: any) => void,
    role: string = 'instructor'
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
        render: (text: any) => {
            if (text === 'multiple') {
                return <div>Nhiều đáp án</div>
            } else if (text === 'single') {
                return <div>Một đáp án</div>
            } else if (text === 'text') {
                return <div>Nhập giá trị</div>
            }
        },
    },
    {
        title: 'Hành động',
        key: 'action',
        align: 'center',
        width: 120,
        fixed: 'right',
        hidden: role !== 'instructor',
        render: (record: any) => (
            <Space>
                <Tooltip title="Sừa câu hỏi" placement="bottom">
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
                <Tooltip title="Xóa câu hỏi" placement="bottom">
                    <Popconfirm
                        title="Xóa câu hỏi"
                        description={`Bạn có chắc chắn muốn xóa câu hỏi này?`}
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
                <Tooltip title="Tạo câu trả lời cho câu hỏi" placement="bottom">
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
                </Tooltip>
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
    onDelete: (record: any) => void,
    onStatusChange: (id: any) => void
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
        render: (_: any, record: any) => {
            return (
                <Switch
                    checkedChildren="Đang hoạt động"
                    unCheckedChildren="Ngừng hoạt động"
                    defaultValue={record.status}
                    onChange={(checked) => {
                        onStatusChange(record.id)
                    }}
                />
            )
        },
    },
    // {
    //     title: 'Trạng thái',
    //     dataIndex: 'status',
    //     key: 'status',
    //     align: 'center',
    //     render: (text: any) => {
    //         return <Tag color={getEventStatusName(text).color}>{getEventStatusName(text).name}</Tag>
    //     },
    // },
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

export const getManageCategoryColumns: any = (
    onEdit: (record: any) => void,
    onDelete: (record: any) => void
) => [
    {
        title: 'Tên danh mục',
        dataIndex: 'name',
        key: 'name',
        align: 'left',
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'created_at',
        key: 'created_at',
        render: (text: string) => formatDateTime(text, DATE_TIME_FORMAT),
    },
    {
        title: 'Hành động',
        key: 'action',
        align: 'center',
        width: 150,
        fixed: 'right',
        render: (record: any) => (
            <Space>
                <Tooltip title="Sửa danh mục" placement="bottom">
                    <Button
                        type="primary"
                        size="small"
                        icon={<FormOutlined />}
                        style={{ borderRadius: 8 }}
                        onClick={() => onEdit(record)}
                    />
                </Tooltip>
                <Tooltip title="Xóa danh mục" placement="bottom">
                    <Popconfirm
                        title="Xóa danh mục"
                        description={`Bạn có chắc chắn muốn xóa danh mục này?`}
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

export const getManageRequestedColumns: any = (
    onAccept: (record: any) => void,
    onReject: (record: any) => void
) => [
    {
        title: 'Họ và tên',
        dataIndex: 'user_full_name',
        key: 'user_full_name',
        align: 'left',
        fixed: 'left',
    },
    {
        title: 'Email',
        dataIndex: 'user_email',
        key: 'user_email',
        align: 'left',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'user_phone',
        key: 'user_phone',
        align: 'center',
    },
    {
        title: 'Thông tin chung',
        dataIndex: 'bio',
        key: 'bio',
        align: 'left',
    },
    {
        title: 'Năm kinh nghiệm',
        dataIndex: 'experience_years',
        key: 'experience_years',
        align: 'center',
    },
    {
        title: 'Linkedin',
        dataIndex: 'linkedin_url',
        key: 'linkedin_url',
        align: 'center',
    },
    {
        title: 'Giới tính',
        dataIndex: 'user_gender',
        key: 'user_gender',
        align: 'center',
    },
    {
        title: 'Ngày sinh',
        dataIndex: 'user_date_of_birth',
        key: 'user_date_of_birth',
        align: 'center',
        render: (text: any) => {
            return <div>{text ? formatDateTime(text, 'DD/MM/YYYY') : ''}</div>
        },
    },
    {
        title: 'Trạng thái',
        dataIndex: 'user_status',
        key: 'user_status',
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
        title: 'Ngày gửi yêu cầu',
        dataIndex: 'created_at',
        key: 'created_at',
        align: 'center',
        render: (text: string) => formatDateTime(text, DATE_TIME_FORMAT),
    },
    {
        title: 'Hành động',
        key: 'action',
        align: 'center',
        width: 150,
        fixed: 'right',
        render: (record: any) => (
            <Space>
                <Tooltip title="Chấp nhận làm giảng viên" placement="bottom">
                    <Popconfirm
                        title="Chấp nhận làm giảng viên"
                        description={`Bạn có muốn người này làm giảng viên không?`}
                        onConfirm={(e) => {
                            // @ts-ignore
                            e.stopPropagation()
                            onReject(record)
                        }}
                        onCancel={() => {}}
                        icon={
                            <QuestionCircleOutlined style={{ color: 'red' }} />
                        }
                        okText="OK"
                        cancelText="Hủy"
                    >
                        <Button
                            variant="outlined"
                            color="green"
                            size="small"
                            icon={<CheckCircleOutlined />}
                        />
                    </Popconfirm>
                </Tooltip>
                <Tooltip title="Từ chối làm giảng viên" placement="bottom">
                    <Popconfirm
                        title="Từ chối làm giảng viên"
                        description={`Bạn có muốn từ chối người này làm giảng viên không?`}
                        onConfirm={(e) => {
                            // @ts-ignore
                            e.stopPropagation()
                            onReject(record)
                        }}
                        onCancel={() => {}}
                        icon={
                            <QuestionCircleOutlined style={{ color: 'red' }} />
                        }
                        okText="OK"
                        cancelText="Hủy"
                    >
                        <Button
                            variant="outlined"
                            color="red"
                            size="small"
                            icon={<CloseCircleOutlined />}
                        />
                    </Popconfirm>
                </Tooltip>
            </Space>
        ),
    },
]

export const getManageReviewColumns: any = (
    onDelete: (record: any) => void,
    role: string = 'instructor'
) => [
    {
        title: 'Họ và tên',
        dataIndex: 'user_full_name',
        key: 'user_full_name',
        align: 'left',
        fixed: 'left',
    },
    {
        title: 'Email',
        dataIndex: 'user_email',
        key: 'user_email',
        align: 'left',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'user_phone',
        key: 'user_phone',
        align: 'center',
    },
    {
        title: 'Giới tính',
        dataIndex: 'user_gender',
        key: 'user_gender',
        align: 'center',
    },
    {
        title: 'Ngày sinh',
        dataIndex: 'user_date_of_birth',
        key: 'user_date_of_birth',
        align: 'center',
        render: (text: any) => {
            return <div>{text ? formatDateTime(text, 'DD/MM/YYYY') : ''}</div>
        },
    },
    {
        title: 'Bình luận',
        dataIndex: 'comment',
        key: 'comment',
        align: 'left',
    },
    {
        title: 'Đánh giá',
        dataIndex: 'rating',
        key: 'rating',
        align: 'center',
    },
    {
        title: 'Hành động',
        key: 'action',
        align: 'center',
        width: 150,
        fixed: 'right',
        hidden: role !== 'instructor',
        render: (record: any) => (
            <Space>
                <Tooltip title="Xóa bình luận" placement="bottom">
                    <Popconfirm
                        title="Xóa bình luận"
                        description={`Bạn có muốn xóa bình luận của người này không?`}
                        onConfirm={(e) => {
                            // @ts-ignore
                            e.stopPropagation()
                            onDelete(record)
                        }}
                        onCancel={() => {}}
                        icon={
                            <QuestionCircleOutlined style={{ color: 'red' }} />
                        }
                        okText="OK"
                        cancelText="Hủy"
                    >
                        <Button
                            variant="outlined"
                            color="red"
                            size="small"
                            icon={<DeleteOutlined />}
                        />
                    </Popconfirm>
                </Tooltip>
            </Space>
        ),
    },
]
