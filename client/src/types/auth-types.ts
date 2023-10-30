export interface User {
    readonly id: number
    readonly firstName: string
    readonly lastName: string
    readonly netId: string
    readonly role: Role
    readonly authToken: string
}

export interface Role {
    readonly roleId: number
    readonly type: 'ADMIN' | 'USER'
}