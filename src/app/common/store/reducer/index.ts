import { ActionReducerMap, createSelector } from "@ngrx/store";
import * as fromAuth from "./auth.reducer";
import * as fromUser from "./user.reducer";
import * as fromTask from "./task.reducer";

export interface RootReducerState {
    user: fromAuth.AuthState,
    getUserById: fromUser.UserState,
    tUsers: fromTask.TaskUserState
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
    user: fromAuth.AuthReducer,
    getUserById: fromUser.UserReducer,
    tUsers: fromTask.TaskUserReducer
}

export const getUserState = (state: RootReducerState) => state.user;
export const getUserProfileState = (state: RootReducerState) => state.getUserById;
export const getDropdownUserState = (state: RootReducerState) => state.tUsers;

export const getUser = createSelector(getUserState, fromAuth.user);
export const getIsAuthenticated = createSelector(getUserState, fromAuth.isAuthenticated);
export const getError = createSelector(getUserState, fromAuth.isError);

export const getisLoading = createSelector(getUserProfileState, fromUser.isLoading);
export const getisLoaded = createSelector(getUserProfileState, fromUser.isLoaded);
export const getUserById = createSelector(getUserProfileState, fromUser.userById);
export const userError = createSelector(getUserProfileState, fromUser.userError);

export const getDropdownUsers = createSelector(getDropdownUserState, fromTask.TUsers);
export const getDropdownIsLoading = createSelector(getDropdownUserState, fromTask.TUserIsLoading);
export const getDropdownIsLoaded = createSelector(getDropdownUserState, fromTask.TUserIsLoaded);
export const getDropdownIsError = createSelector(getDropdownUserState, fromTask.TUserError);
