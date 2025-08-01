import { useEffect, useState } from 'react'

import { Button, Modal, Popconfirm, Space, Table, notification } from 'antd'

import {
    DeleteOutlined,
    FormOutlined,
    PlusOutlined,
    QuestionCircleOutlined,
} from '@ant-design/icons'

import CreateAnswerModal from '@/components/core/modal/CreateAnswerModal'
import CreateQuestionModal from '@/components/core/modal/CreateQuestionModal'
import UpdateAnswerModal from '@/components/core/modal/UpdateAnswerModal'
import UpdateQuestionModal from '@/components/core/modal/UpdateQuestionModal'
import { getManageQuestionColumns } from '@/constants/table'
import AnswerService from '@/services/answer'
import QuestionService from '@/services/question'

const ListQuestionModal = ({ visible, onClose, record }: any) => {
    const [loading, setLoading] = useState(false)
    const [questions, setQuestions] = useState<any[]>([])
    const [modalRecord, setModalRecord] = useState<any>(null)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const [isModalCreateQuestionOpen, setIsModalCreateQuestionOpen] =
        useState(false)
    const [isModalUpdateQuestionOpen, setIsModalUpdateQuestionOpen] =
        useState(false)
    const [isModalCreateAnswerOpen, setIsModalCreateAnswerOpen] =
        useState(false)
    const [isModalUpdateAnswerOpen, setIsModalUpdateAnswerOpen] =
        useState(false)

    const handleCancel = () => {
        onClose()
    }

    const openModalCreate = (item: any) => {
        setModalRecord(item)
        setIsModalCreateAnswerOpen(true)
    }

    const openModalUpdate = (item: any) => {
        setModalRecord(item)
        setIsModalUpdateQuestionOpen(true)
    }

    const onModalDelete = (item: any) => {
        setModalRecord(item)
        handleDeleteQuestion(item)
    }

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await QuestionService.getByQuiz(record.id)
            setQuestions(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleCreateQuestion = async (values: any) => {
        try {
            const response = await QuestionService.create({
                question_text: values.question_text,
                question_type: values.question_type,
                order_number: values.order_number,
                quiz_id: record.id,
            })
            if (response.status === 200) {
                await fetchData()
                setIsModalCreateQuestionOpen(false)
                notification.success({
                    message: 'Tạo câu hỏi thành công',
                })
            }
        } catch (e) {
            console.log(e)
            notification.error({
                message: 'Tạo câu hỏi thất bại',
            })
        }
    }

    const handleUpdateQuestion = async (values: any) => {
        try {
            const response = await QuestionService.update(modalRecord.id, {
                question_text: values.question_text,
                question_type: values.question_type,
                order_number: values.order_number,
            })
            if (response.status === 200) {
                await fetchData()
                setIsModalUpdateQuestionOpen(false)
                notification.success({
                    message: 'Cập nhật câu hỏi thành công',
                })
            }
        } catch (e) {
            console.log(e)
            notification.error({
                message: 'Cập nhật câu hỏi thất bại',
            })
        }
    }

    const handleDeleteQuestion = async (values: any) => {
        try {
            const response = await QuestionService.delete(values.id)
            if (response.status === 200) {
                await fetchData()
                notification.success({
                    message: 'Xóa câu hỏi thành công',
                })
            }
        } catch (e) {
            console.log(e)
            notification.error({
                message: 'Xóa câu hỏi thất bại',
            })
        }
    }

    const handleCreateAnswer = async (values: any) => {
        try {
            const response = await AnswerService.create({
                answer_text: values.answer_text,
                question_id: modalRecord.id,
                is_correct: !!values.is_correct,
            })
            if (response.status === 200) {
                await fetchData()
                setIsModalCreateQuestionOpen(false)
                notification.success({
                    message: 'Tạo đáp án thành công',
                })
            }
        } catch (e) {
            console.log(e)
            notification.error({
                message: 'Tạo đáp án thất bại',
            })
        }
    }

    const handleUpdateAnswer = async (values: any) => {
        try {
            const response = await AnswerService.update(modalRecord.id, {
                answer_text: values.answer_text,
                is_correct: !!values.is_correct,
            })
            if (response.status === 200) {
                await fetchData()
                setIsModalUpdateQuestionOpen(false)
                notification.success({
                    message: 'Cập nhật đáp án thành công',
                })
            }
        } catch (e) {
            console.log(e)
            notification.error({
                message: 'Cập nhật đáp án thất bại',
            })
        }
    }

    const handleDeleteAnswer = async (values: any) => {
        try {
            const response = await AnswerService.delete(values.id)
            if (response.status === 200) {
                await fetchData()
                notification.success({
                    message: 'Xóa đáp án thành công',
                })
            }
        } catch (e) {
            console.log(e)
            notification.error({
                message: 'Xóa đáp án thất bại',
            })
        }
    }

    useEffect(() => {
        fetchData()
    }, [visible])

    const columns: any = getManageQuestionColumns(
        openModalUpdate,
        onModalDelete,
        openModalCreate
    )

    const openUpdateModalAnswer = (item: any) => {
        setModalRecord(item)
        setIsModalUpdateAnswerOpen(true)
    }

    return (
        <Modal
            title={
                <div>
                    {`Danh sách câu hỏi: ${record?.title}`}
                    <Button
                        style={{ marginLeft: 10 }}
                        onClick={() => setIsModalCreateQuestionOpen(true)}
                        icon={<PlusOutlined />}
                        color="primary"
                    />
                </div>
            }
            open={visible}
            onCancel={handleCancel}
            width="50%"
            footer={null}
        >
            <Table
                columns={columns}
                dataSource={questions}
                bordered
                pagination={{ pageSize: 10 }}
                rowKey="id"
                loading={loading}
                expandable={{
                    expandedRowRender: (record) => (
                        <Table
                            columns={[
                                {
                                    title: 'ID',
                                    dataIndex: 'id',
                                    key: 'id',
                                    width: 70,
                                    align: 'center',
                                    fixed: 'left',
                                },
                                {
                                    title: 'Đáp án',
                                    dataIndex: 'answer_text',
                                    key: 'answer_text',
                                },
                                {
                                    title: 'Đúng/ Sai',
                                    dataIndex: 'is_correct',
                                    key: 'is_correct',
                                    render: (val) => (val ? '✔️' : '❌'),
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
                                                    openUpdateModalAnswer(
                                                        record
                                                    )
                                                }}
                                            />
                                            <Popconfirm
                                                title="Xóa đáp án"
                                                description={`Bạn có chắc chắn muốn xóa đáp án này?`}
                                                onConfirm={(e) => {
                                                    // @ts-ignore
                                                    e.stopPropagation()
                                                    handleDeleteAnswer(record)
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
                                        </Space>
                                    ),
                                },
                            ]}
                            dataSource={record.answers}
                            rowKey="id"
                            pagination={false}
                            size="small"
                            bordered
                        />
                    ),
                    rowExpandable: (record) =>
                        record.answers && record.answers.length > 0,
                }}
            />
            <UpdateQuestionModal
                visible={isModalUpdateQuestionOpen}
                onClose={() => {
                    setModalRecord(null)
                    setIsModalUpdateQuestionOpen(false)
                }}
                onSubmit={(values: any) => handleUpdateQuestion(values)}
                record={modalRecord}
            />
            <CreateQuestionModal
                visible={isModalCreateQuestionOpen}
                onClose={() => {
                    setModalRecord(null)
                    setIsModalCreateQuestionOpen(false)
                }}
                onSubmit={(values: any) => handleCreateQuestion(values)}
            />
            <CreateAnswerModal
                visible={isModalCreateAnswerOpen}
                onClose={() => {
                    setModalRecord(null)
                    setIsModalCreateAnswerOpen(false)
                }}
                onSubmit={(values: any) => handleCreateAnswer(values)}
            />
            <UpdateAnswerModal
                visible={isModalUpdateAnswerOpen}
                onClose={() => {
                    setModalRecord(null)
                    setIsModalUpdateAnswerOpen(false)
                }}
                onSubmit={(values: any) => handleUpdateAnswer(values)}
                record={modalRecord}
            />
        </Modal>
    )
}

export default ListQuestionModal
