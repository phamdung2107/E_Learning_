import { useEffect, useState } from 'react'

import { Button, Modal, Popconfirm, Space, Table } from 'antd'

import QuestionService from '@/services/question'

import { getManageQuestionColumns } from '@/constants/table'
import { DeleteOutlined, FormOutlined, QuestionCircleOutlined } from '@ant-design/icons'

const ListQuestionModal = ({ visible, onClose, record }: any) => {
    const [loading, setLoading] = useState(false)
    const [questions, setQuestions] = useState<any[]>([])
    const [modalRecord, setModalRecord] = useState<any>(null)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const handleCancel = () => {
        onClose()
    }

    const openModalCreate = (item: any) => {
        setModalRecord(item)
    }

    const openModalUpdate = (item: any) => {
        setModalRecord(item)
    }

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await QuestionService.getByQuiz(record.id)
            console.log(response)
            setQuestions(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [visible])

    const columns: any = getManageQuestionColumns(
        openModalUpdate,
        openModalCreate
    )

    const openUpdateModalAnswer = (item: any) => {
        setModalRecord(item)
        setIsUpdateModalOpen(true)
    }

    return (
        <Modal
            title={`List Question: ${record?.title}`}
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
                                { title: 'ID', dataIndex: 'id', key: 'id', width: 70, align: 'center', fixed: 'left' },
                                { title: 'Answer', dataIndex: 'answer_text', key: 'answer_text' },
                                {
                                    title: 'Is Correct',
                                    dataIndex: 'is_correct',
                                    key: 'is_correct',
                                    render: (val) => (val ? '✔️' : '❌'),
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
                                                    openUpdateModalAnswer(record)
                                                }}
                                            />
                                            <Popconfirm
                                                title="Delete the answer"
                                                description={`Are you sure to delete this answer`}
                                                onConfirm={(e) => {
                                                    // @ts-ignore
                                                    e.stopPropagation()
                                                    openModalUpdate(record)
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
                            ]}
                            dataSource={record.answers}
                            rowKey="id"
                            pagination={false}
                            size="small"
                            bordered
                        />
                    ),
                    rowExpandable: (record) => record.answers && record.answers.length > 0,
                }}
            />
            <Modal
                title={`Update Answer: ${modalRecord?.answer_text}`}
                open={isUpdateModalOpen}
                onCancel={() => setIsUpdateModalOpen(false)}
                centered
                width="30%"
                footer={null}
            >

            </Modal>

        </Modal>
    )
}

export default ListQuestionModal