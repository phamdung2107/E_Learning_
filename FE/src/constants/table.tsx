import { Tag } from 'antd'

import { DATE_TIME_FORMAT } from '@/constants/date'
import { formatDateTime } from '@/utils/format'

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
