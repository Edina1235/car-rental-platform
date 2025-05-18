export enum Role {
    Admin = "admin",
    User = "user"
}

export interface User {
    _id?: string,
    name: string,
    email: string,
    passwordHash: string,
    role: Role,
    createdAt?: string
}