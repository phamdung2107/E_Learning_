import React from 'react'
import { Typography } from 'antd'
import { Line } from '@ant-design/charts'

const { Text } = Typography

const StudentActivityChart = ({ instructorId }: any) => {
    const data = [
        { month: 'Jan', type: 'Lesson Views', value: 120 },
        { month: 'Feb', type: 'Lesson Views', value: 190 },
        { month: 'Mar', type: 'Lesson Views', value: 150 },
        { month: 'Apr', type: 'Lesson Views', value: 220 },
        { month: 'May', type: 'Lesson Views', value: 300 },
        { month: 'Jun', type: 'Lesson Views', value: 280 },
        { month: 'Jul', type: 'Lesson Views', value: 350 },
        { month: 'Jan', type: 'Quiz Completions', value: 50 },
        { month: 'Feb', type: 'Quiz Completions', value: 80 },
        { month: 'Mar', type: 'Quiz Completions', value: 60 },
        { month: 'Apr', type: 'Quiz Completions', value: 100 },
        { month: 'May', type: 'Quiz Completions', value: 120 },
        { month: 'Jun', type: 'Quiz Completions', value: 110 },
        { month: 'Jul', type: 'Quiz Completions', value: 130 },
    ]

    const config = {
        data: data,
        xField: 'month',
        yField: 'value',
        seriesField: 'type',
        height: 300,
        color: ['#1890ff', '#52c41a'],
        lineStyle: {
            lineWidth: 2,
        },
        point: {
            size: 5,
            shape: 'circle',
        },
        xAxis: {
            title: {
                text: 'Month',
            },
        },
        yAxis: {
            title: {
                text: 'Count',
            },
            min: 0,
        },
        // legend: {
        //     position: 'top',
        // },
        tooltip: {
            showMarkers: true,
        },
        // animation: {
        //     appear: {
        //         animation: 'path-in',
        //         duration: 500,
        //     },
        // },
    }

    return (
        <Line {...config} />
    )
}

export default StudentActivityChart