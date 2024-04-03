import { TaskBoard } from "../../interface/task"
import { Action } from "../action"
import { TaskBoardActionType } from "../action/taskboard.action"


export interface TaskBoardState {
    isLoading: boolean,
    isLoaded: boolean,
    taskBoard: TaskBoard[],
    isError: boolean
}

export const initialState: TaskBoardState = {
    isLoading: false,
    isLoaded: false,
    taskBoard: [],
    isError: false
}

export function TaskUserReducer(state = initialState, action: Action): TaskBoardState {
    switch (action.type) {

        case TaskBoardActionType.GET_TASKBOARD_LIST:
            return { ...state, isLoading: true, isLoaded: false, isError: false }

        case TaskBoardActionType.GET_TASKBOARD_LIST_SUCCESS:
            return { ...state, isLoading: false, isLoaded: true, taskBoard: action.payload, isError: false }

        case TaskBoardActionType.GET_TASKBOARD_LIST_ERROR:
            return { ...state, isLoading: false, isLoaded: false, isError: true }

        default:
            return { ...state }
    }
}

export const TBIsLoading = (state: TaskBoardState) => state.isLoading;
export const TBIsLoaded = (state: TaskBoardState) => state.isLoaded;
export const Taskboards = (state: TaskBoardState) => state.taskBoard;
export const TBError = (state: TaskBoardState) => state.isError;
