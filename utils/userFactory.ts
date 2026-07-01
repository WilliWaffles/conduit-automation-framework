export interface User {
    username: string;
    email: string;
    password: string;
};

export interface UserPlusToken extends User {
    token: string;
}

export function createUser(): User {
    return {
        username: `qa-user-${Date.now()}`,
        email: `qa-user-${Date.now()}@testemail.com`,
        password: "123456789",
    }
}