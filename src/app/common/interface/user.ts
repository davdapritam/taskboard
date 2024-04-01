export interface LoginResponse {
    Status: number,
    message: string,
    data: User
}

export interface User {
    id: string,
    token: string
}

export interface LoginRequestData {
    email: string;
    password: string
}

export interface signUpRequestData {
    firstName: string,
    lastName: string,
    mobileNo: string,
    email: string,
    password: string,
    profilePic: string
}