import { ActionReducerMap, createSelector } from "@ngrx/store";
import * as fromAuth from "./auth.reducer";


export interface RootReducerState {
    user: fromAuth.AuthState
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
    user: fromAuth.AuthReducer
}

export const getUserState = (state: RootReducerState) => state.user;

export const getUser = createSelector(getUserState, fromAuth.user);
export const getIsAuthenticated = createSelector(getUserState, fromAuth.isAuthenticated);
export const getError = createSelector(getUserState, fromAuth.isError);