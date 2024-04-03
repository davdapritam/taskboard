import { Injectable } from "@angular/core";
import { TaskService } from "./task.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Store } from "@ngrx/store";
import { RootReducerState, getDropdownIsError, getDropdownIsLoaded, getDropdownIsLoading, getDropdownUsers, getTaskboardIsError, getTaskboardIsLoaded, getTaskboardIsLoading, getTaskboards } from "../common/store/reducer";
import { Observable, combineLatest, take } from "rxjs";
import { UserListAction, UserListErrorAction, UserListSuccessAction } from "../common/store/action/task.action";
import { UserDropdown } from "../common/interface/user";
import { TaskBoardAction, TaskBoardErrorAction, TaskBoardSuccessAction } from "../common/store/action/taskboard.action";
import { SharedService } from "./shared.service";
import { TaskBoard } from "../common/interface/task";

@Injectable()
export class Task {

    constructor(private taskService: TaskService, private store: Store<RootReducerState>,
        private router: Router, private toastrService: ToastrService, private sharedService: SharedService) { }

    getTaskboards(force = false): [Observable<boolean>, Observable<boolean>, Observable<TaskBoard[]>, Observable<boolean>] {
        const isLoading$ = this.store.select(getTaskboardIsLoading);
        const isLoaded$ = this.store.select(getTaskboardIsLoaded);
        const taskboard$ = this.store.select(getTaskboards);
        const Error$ = this.store.select(getTaskboardIsError);

        combineLatest([isLoaded$, isLoading$]).pipe(take(1)).subscribe((data) => {
            if ((!data[0] && !data[1]) || force) {
                this.store.dispatch(new TaskBoardAction())
                this.taskService.getAllTaskBoards(this.sharedService.user.id).subscribe((res) => {
                    if (res.Status == 1) {
                        if (this.sharedService.isTaskBoardForce) {
                            this.sharedService.isTaskBoardForce = false;
                        }
                        this.store.dispatch(new TaskBoardSuccessAction(res.data));
                    } else {
                        this.toastrService.error(res.message);
                        this.store.dispatch(new TaskBoardErrorAction());
                    }
                }, (error) => {
                    this.store.dispatch(new TaskBoardErrorAction());
                })
            }
        })

        return [isLoading$, isLoaded$, taskboard$, Error$]
    }

    getAllUsers(force = false): [Observable<boolean>, Observable<UserDropdown[]>, Observable<boolean>] {
        const isLoading$ = this.store.select(getDropdownIsLoading);
        const isLoaded$ = this.store.select(getDropdownIsLoaded);
        const user$ = this.store.select(getDropdownUsers);
        const userError$ = this.store.select(getDropdownIsError);

        combineLatest([isLoaded$, isLoading$]).pipe(take(1)).subscribe((data) => {
            if (!data[0] && !data[1] || force) {
                this.store.dispatch(new UserListAction())
                this.taskService.getAllUsers().subscribe((res) => {
                    if (res.Status == 1) {
                        this.store.dispatch(new UserListSuccessAction(res.data))
                    } else {
                        this.toastrService.error(res.message);
                    }
                }, (error) => {
                    this.store.dispatch(new UserListErrorAction())
                })
            }
        })
        return [isLoading$, user$, userError$]
    }

}