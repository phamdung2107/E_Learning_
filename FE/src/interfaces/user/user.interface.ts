import type { Role } from '@/interfaces/auth/auth.interface'
import type { Device } from '@/interfaces/layout/index.interface'
import type { MenuChild } from '@/interfaces/layout/menu.interface'

export type Locale = 'zh_CN' | 'en_US'

export interface UserState {
    username: string

    /** menu list for init tagsView */
    menuList: MenuChild[]

    /** login status */
    logged: boolean

    role: Role

    /** user's device */
    device: Device

    /** menu collapsed status */
    collapsed: boolean

    /** notification count */
    noticeCount: number

    /** user's language */
    locale: Locale

    /** Is first time to view the site ? */
    newUser: boolean
}
