import React, { useEffect, useState } from 'react'

import { DualAxes } from '@ant-design/charts'

import InstructorService from '@/services/instructor'

interface MonthlyRevenueData {
    month: string
    revenue: number
}

export const MonthlyRevenueChart = ({ id, role = 'instructor' }: any) => {
    const [data, setData] = useState<MonthlyRevenueData[]>([])

    const fetchData = async () => {
        try {
            let res
            if (role === 'admin') {
                res = await InstructorService.getMonthlyRevenueByAdmin()
            } else if (role === 'instructor') {
                res = await InstructorService.getMonthlyRevenueInstructor(id)
            }
            if (res.status === 200) {
                setData(res.data)
            }
        } catch (err) {
            console.error('Failed to fetch revenue data:', err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const config = {
        data: [data, data],
        xField: 'month',
        yField: ['revenue', 'revenue'],
        geometryOptions: [
            {
                geometry: 'column',
                color: '#20B2AA',
                columnStyle: {
                    radius: [4, 4, 0, 0],
                },
            },
            {
                geometry: 'line',
                color: '#FF8C00',
                lineStyle: {
                    lineWidth: 2,
                },
                point: {
                    size: 4,
                    shape: 'circle',
                    style: {
                        fill: 'white',
                        stroke: '#FF8C00',
                        lineWidth: 2,
                    },
                },
            },
        ],
        tooltip: {
            shared: true,
            showMarkers: true,
            formatter: (datum: any) => ({
                name: 'Doanh thu',
                value: `${datum.revenue.toLocaleString()} VND`,
            }),
        },
    }

    return <DualAxes {...config} />
}
