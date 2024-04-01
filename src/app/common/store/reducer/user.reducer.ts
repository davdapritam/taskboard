import { GetUser } from "../../interface/user"
import { Action } from "../action"
import { AuthActionType } from "../action/auth.action"

export interface UserState {
    isLoading: boolean,
    isLoaded: boolean,
    user: GetUser,
    isError: boolean
}

export const initialState: UserState = {
    isLoading: false,
    isLoaded: false,
    user: {
        firstName: '',
        lastName: '',
        mobileNo: '',
        email: '',
        password: '',
        profilePic: '',

    },
    isError: false
}

export function UserReducer(state = initialState, action: Action): UserState {
    switch (action.type) {

        case AuthActionType.USER_SUCCESS:
            return { ...state, isLoading: false, isLoaded: true, user: action.payload, isError: false }

        case AuthActionType.USER_ERROR:
            return { ...state, isLoading: true, isLoaded: false, user: action.payload, isError: true }

        default:
            return { ...state }
    }
}

export const isLoading = (state: UserState) => state.isLoading;
export const isLoaded = (state: UserState) => state.isLoaded;
export const userById = (state: UserState) => state.user;
export const userError = (state: UserState) => state.isError;
