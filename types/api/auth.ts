export interface User {
    id: number;
    email: string;
    name: string;
    role: USER_ROLES;
}

export enum USER_ROLES {
    USER = 'user',
    ADMIN = 'admin',
}
