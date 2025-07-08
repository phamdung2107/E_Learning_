import dayjs from 'dayjs'

import { DATE_PAYLOAD_FORMAT } from '@/constants/date'

export const formatDateTime = (datetime: any, format: any = null) => {
    if (!format) {
        format = DATE_PAYLOAD_FORMAT
    }
    return dayjs(datetime).tz().format(format)
}

export const formatNumberWithComas = (number: any, comas: any) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, comas)
}

export const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(price)
}
