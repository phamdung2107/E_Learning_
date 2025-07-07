import { Machine } from './machine.interface'

export interface ProductLine {
    lineId: string
    lineName: string
    lastUpdated: string
    updatedBy: string | null
    isInactive: boolean | null
    machines: Machine[]
    isDisposed: boolean
}

export interface ProductLineFormData {
    lineId: string
    lineName: string
}
