import { Dayjs } from 'dayjs'

type SummarySearchTable = 0 | 1 | 2 | 3

export interface SearchModelDto {
    startTime: string
    endTime: string
    machineKeyId: number
    machineid?: string | null
    machinetype?: string | null
    lineid?: string | null
    searchTable: SummarySearchTable
}

export interface SearchBoardDto {
    server?: any
    line?: string | string[] | null
    machine?: any
    startTime?: Dayjs | null
    endTime?: Dayjs | null
    model?: any
    boards?: any
}

export interface DefectType {
    defectTypeId?: string | null
    abbr?: string | null
    name?: string | null
    count: number
}

export interface BoardResult {
    inspected: any[]
    uninspected: any[]
}

export interface BoardResultSummary {
    isDisposed: boolean
    machineKeyId?: number | null
    machineId?: string | null
    inspectSequence: number
    boardId?: string | null
    barcode?: string | null
    result: string
    isRepairReviewed?: boolean | null
    isUpdated: boolean
    realFailureString2d?: string | null
    realFailureString3d?: string | null
    falseCallString2d?: string | null
    falseCallString3d?: string | null
    defectTypes?: DefectType[] | null
    defectTypes3d?: DefectType[] | null
    defectTypes2d?: DefectType[] | null
    currentDefectType?: DefectType[] | null
    currentDefectType2d?: DefectType[] | null
    currentDefectType3d?: DefectType[] | null
    falseCallDefectTypes?: DefectType[] | null
    falseCallDefectTypes2d?: DefectType[] | null
    falseCallDefectTypes3d?: DefectType[] | null
    defectTypes2dToStringDefectTypeByComma?: string | null
    defectTypes3dToStringDefectTypeByComma?: string | null
    falseCallDefectTypes2dToStringDefectTypeByComma?: string | null
    falseCallDefectTypes3dToStringDefectTypeByComma?: string | null
    lineId?: string | null
    recyclingStatus?: string | null
    isUnclassifiedPcb?: boolean | null
    searchTable: SummarySearchTable
    summarySeq: number
    summaryTime: string
    summaryEndTime: string
    modelId?: string | null
    sideId: number
    lotNumber?: string | null
    operatorId?: string | null
    totalSolderJoints?: number | null
    errorSolderJoints?: number | null
    passSolderJoints?: number | null
    dateCreated: string
    totalInspCounts: number
    inspectStart: string
    partNumber?: string | null
    supplierId?: string | null
    winPadId?: string | null
    moduleId: number
    teamId?: string | null
    totalItemCount: number
    realFailureItemCount: number
    goodItemCount: number
    falseCallItemCount: number
    inspectEnd: string
    totalTResultParts: number
    totalPResultParts: number
    totalNResultParts: number
    totalGResultParts: number
    totalModulesSkipped?: number | null
    descriptionText?: string | null
    totalInspTime: number
    tactTime: number
    totalTResultItemCount: number
    totalPResultItemCount: number
    totalRecyclingCounts: number
    totalRecyclingParts: number
    totalRecyclingWindows: number
    totalInspCountsUncla?: number | null
    totalTResultPartsUncla: number
    totalPResultPartsUncla: number
    totalNResultPartsUncla: number
    totalGResultPartsUncla: number
    realFailureString2dUncla?: string | null
    realFailureString3dUncla?: string | null
    falseCallString2dUncla?: string | null
    falseCallString3dUncla?: string | null
    defectTypesUncla?: DefectType[] | null
    defectTypes2dUncla?: DefectType[] | null
    defectTypes3dUncla?: DefectType[] | null
    falseCallDefectTypesUncla?: DefectType[] | null
    falseCallDefectTypes2dUncla?: DefectType[] | null
    falseCallDefectTypes3dUncla?: DefectType[] | null
    totalSolderJointsUncla?: number | null
    errorSolderJointsUncla?: number | null
    passSolderJointsUncla?: number | null
    totalInspTimeUncla: number
    totalRecyclingCountsUncla: number
    totalRecyclingPartsUncla: number
    totalRecyclingWindowsUncla: number
}
