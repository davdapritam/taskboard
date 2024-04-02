import { UserDropdown } from "../../interface/user"
import { Action } from "../action"
import { TaskActionType } from "../action/task.action"

export interface TaskUserState {
    isLoading: boolean,
    isLoaded: boolean,
    users: UserDropdown[],
    isError: boolean
}

export const initialState: TaskUserState = {
    isLoading: false,
    isLoaded: false,
    users: [],
    isError: false
}

export function TaskUserReducer(state = initialState, action: Action): TaskUserState {
    switch (action.type) {

        case TaskActionType.GET_USER_LIST:
            return { ...state, isLoading: true, isLoaded: false, isError: false }

        case TaskActionType.USER_LIST_SUCCESS:
            return { ...state, isLoading: false, isLoaded: true, users: action.payload, isError: false }

        case TaskActionType.USER_LIST_ERROR:
            return { ...state, isLoading: true, isLoaded: false, isError: true }

        default:
            return { ...state }
    }
}

export const TUserIsLoading = (state: TaskUserState) => state.isLoading;
export const TUserIsLoaded = (state: TaskUserState) => state.isLoaded;
export const TUsers = (state: TaskUserState) => state.users;
export const TUserError = (state: TaskUserState) => state.isError;
