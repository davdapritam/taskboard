export enum TaskActionType {
    GET_USER_LIST = '[TASK] Get User List',
    USER_LIST_SUCCESS = '[TASK] User List Success',
    USER_LIST_ERROR = '[TASK] User List Error',
}


export class UserListAction {
    readonly type = TaskActionType.GET_USER_LIST
}

export class UserListSuccessAction {
    readonly type = TaskActionType.USER_LIST_SUCCESS

    constructor(public payload?: any) { }
}

export class UserListErrorAction {
    readonly type = TaskActionType.USER_LIST_ERROR
}