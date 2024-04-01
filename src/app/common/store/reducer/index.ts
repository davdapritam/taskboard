import { ActionReducerMap, createSelector } from "@ngrx/store";
import * as fromAuth from "./auth.reducer";
import * as fromUser from "./user.reducer";

export interface RootReducerState {
    user: fromAuth.AuthState,
    getUserById: fromUser.UserState
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
    user: fromAuth.AuthReducer,
    getUserById: fromUser.UserReducer
}

export const getUserState = (state: RootReducerState) => state.user;

export const getUserProfileState = (state: RootReducerState) => state.getUserById;

export const getUser = createSelector(getUserState, fromAuth.user);
export const getIsAuthenticated = createSelector(getUserState, fromAuth.isAuthenticated);
export const getError = createSelector(getUserState, fromAuth.isError);

export const getisLoading = createSelector(getUserProfileState, fromUser.isLoading);
export const getisLoaded = createSelector(getUserProfileState, fromUser.isLoaded);
export const getUserById = createSelector(getUserProfileState, fromUser.userById);
export const userError = createSelector(getUserProfileState, fromUser.userError);
