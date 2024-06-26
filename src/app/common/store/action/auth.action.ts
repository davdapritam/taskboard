import { User } from "../../interface/user"

export enum AuthActionType {
    LOGIN = '[Auth] Login',
    LOGIN_SUCCESS = '[Auth] Success',
    LOGIN_ERROR = '[Auth] Error',
    LOGOUT = '[Auth] Logout',

    SIGNUP = '[Auth] Signup',
    SIGNUP_SUCCESS = '[Auth] Signup Success',
    SIGNUP_ERROR = '[Auth] Signup Error',
    SIGNUP_EXISTS = '[Auth] USER EXISTS',

    USER_GET_BY_ID = '[GET] Get User',
    USER_SUCCESS = '[GET] Get User Successfully',
    USER_ERROR = '[GET] Error Getting User',
    USER_UPDATE = '[GET] User Update',
    USER_UPDATE_SUCCESS = '[GET] Get User Successfully',

}

export class LoginAction {
    readonly type = AuthActionType.LOGIN

    constructor(public payload?: any) { }
}

export class LoginSuccessAction {
    readonly type = AuthActionType.LOGIN_SUCCESS

    constructor(public payload?: { data: User }) { }
}

export class LoginErrorAction {
    readonly type = AuthActionType.LOGIN_ERROR

    constructor(public payload?: any) { }
}

export class LogoutAction {
    readonly type = AuthActionType.LOGOUT
}

export class SignupAction {
    readonly type = AuthActionType.SIGNUP;

    constructor(public payload?: { data: any }) { }
}


export class SignupSuccessAction {
    readonly type = AuthActionType.SIGNUP_SUCCESS

    constructor(public payload?: { data: User }) { }
}

export class SignupExistsAction {
    readonly type = AuthActionType.SIGNUP_EXISTS
}

export class SignupErrorAction {
    readonly type = AuthActionType.SIGNUP_ERROR

    constructor(public payload?: any) { }
}

export class UserGetByIDAction {
    readonly type = AuthActionType.USER_GET_BY_ID
}

export class UserSuccessAction {
    readonly type = AuthActionType.USER_SUCCESS

    constructor(public payload?: any) { }
}

export class UserErrorAction {
    readonly type = AuthActionType.USER_ERROR
}

export class UserUpdateAction {
    readonly type = AuthActionType.USER_UPDATE

    constructor(public payload?: any) { }
}

export class UserUpdateSuccessAction {
    readonly type = AuthActionType.USER_UPDATE_SUCCESS

    constructor(public payload?: any) { }
}