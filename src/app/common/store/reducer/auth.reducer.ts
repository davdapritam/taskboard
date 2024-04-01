import { User } from "../../interface/user"
import { Action } from "../action"
import { AuthActionType } from "../action/auth.action"

export interface AuthState {
    isAuthenticated: boolean,
    user: User,
    isError: boolean
}

export const initialState: AuthState = {
    isAuthenticated: false,
    user: {
        id: '',
        token: ''
    },
    isError: false
}

export function AuthReducer(state = initialState, action: Action): AuthState {
    switch (action.type) {

        case AuthActionType.LOGIN_SUCCESS:
            return { ...state, isAuthenticated: true, user: action.payload, isError: false }

        case AuthActionType.LOGIN_ERROR:
            return { ...state, isAuthenticated: false, isError: true }

        case AuthActionType.LOGOUT:
            return { ...state, isAuthenticated: false }

        case AuthActionType.SIGNUP_SUCCESS:
            return { ...state, isAuthenticated: true, user: action.payload, isError: false }

        case AuthActionType.SIGNUP_ERROR:
            return { ...state, isAuthenticated: false, isError: true }

        case AuthActionType.SIGNUP_EXISTS:
            return { ...state, isAuthenticated: false, isError: true }

        default:
            return { ...state }
    }
}

export const isAuthenticated = (state: AuthState) => state.isAuthenticated;
export const user = (state: AuthState) => state.user;
export const isError = (state: AuthState) => state.isError;
