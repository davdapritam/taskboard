import { TaskBoard } from "../../interface/task"

export enum TaskBoardActionType {
    GET_TASKBOARD_LIST = '[TASKBOARD] Get Taskboard List',
    GET_TASKBOARD_LIST_SUCCESS = '[TASKBOARD] Taskboard List Success',
    GET_TASKBOARD_LIST_ERROR = '[TASKBOARD] Taskboard List Error',
}


export class TaskBoardAction {
    readonly type = TaskBoardActionType.GET_TASKBOARD_LIST
}

export class TaskBoardSuccessAction {
    readonly type = TaskBoardActionType.GET_TASKBOARD_LIST_SUCCESS

    constructor(public payload?: TaskBoard[]) { }
}

export class TaskBoardErrorAction {
    readonly type = TaskBoardActionType.GET_TASKBOARD_LIST_ERROR
}