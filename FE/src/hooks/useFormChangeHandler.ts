import { useCallback } from 'react'

export function useFormChangeHandler<T extends object>(
    setFormFilter: (val: any) => any
) {
    return useCallback(
        <K extends keyof T>(key: K) =>
            (value: T[K]) => {
                setFormFilter({ [key]: value } as any)
            },
        [setFormFilter]
    )
}
