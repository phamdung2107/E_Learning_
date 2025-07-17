import { Modal, Table } from 'antd'
import { getManageQuestionColumns } from '@/constants/table'
import { useState } from 'react'

const ListQuestionModal = ({ visible, onClose, record }: any) => {
    const [loading, setLoading] = useState(false)
    const [modalRecord, setModalRecord] = useState<any>(null)
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

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const columns: any = getManageQuestionColumns(openModalUpdate, openModalCreate)
    return (
        <Modal
            title={`List Question: ${record?.title}`}
            open={visible}
            onCancel={handleCancel}
            width="50%"
            footer={null}
        >
            <Table columns={columns} dataSource={[]} bordered pagination={{ pageSize: 10 }} rowKey="id" loading={loading} />
        </Modal>
    )
}

export default ListQuestionModal