type AddressFamily =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 28
    | 29
    | 65536
    | 65537
    | -1

type MachineRoles = 0 | 1 | 2 | 3

export interface Machine {
    isDisposed?: boolean
    isDirty: boolean
    machineKeyID: number
    machineId?: string | null
    lineId?: string | null
    typeId?: string | null
    machineName?: string | null
    ipAddress: string
    database?: string | null
    priority?: number | null
    lastUpdated?: string | null
    updatedBy?: string | null
    machineRole?: string | null
    machineRoleEnum: MachineRoles
    totalLanes?: number | null
    isHostMachine?: boolean | null
    lastDataSync?: string | null
    isDataSyncCompleted?: boolean | null
    isInactive: boolean
}

export interface DeleteMachinePayload {
    machineKeyID: number
}

export interface UpdateMachinePayload {
    machineKeyID: number
    machineId?: string | null
    lineId?: string | null
    typeId?: string | null
    machineName?: string | null
    priority?: number | null
    ipAddress: string
    isInactive: boolean
}

export interface MachineTableProps {
    machines: Machine[]
    selectedLineID: any
    refreshMachine: any
}
