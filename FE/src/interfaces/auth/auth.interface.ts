/** user's role */
export type Role = 'guest' | 'admin'

export interface LoginDto {
    username: string
    password: string
}

export interface LoginResult {
    /** auth token */
    token: string
    username: string
    role: Role
}

export interface LogoutDto {
    token: string
}

export interface LogoutResult {}
