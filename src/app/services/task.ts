import { Injectable } from "@angular/core";
import { TaskService } from "./task.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Store } from "@ngrx/store";
import { RootReducerState, getDropdownIsError, getDropdownIsLoaded, getDropdownIsLoading, getDropdownUsers } from "../common/store/reducer";
import { Observable, combineLatest, take } from "rxjs";
import { UserListAction, UserListErrorAction, UserListSuccessAction } from "../common/store/action/task.action";
import { UserDropdown } from "../common/interface/user";

@Injectable()
export class Task {

    constructor(private taskService: TaskService, private store: Store<RootReducerState>,
        private router: Router, private toastrService: ToastrService) { }


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