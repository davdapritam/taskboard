import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Store } from "@ngrx/store";
import { RootReducerState, getError, getIsAuthenticated, getUser, getUserById, getisLoaded, getisLoading, userError } from "../common/store/reducer";
import { Observable, combineLatest, take } from "rxjs";
import { LoginRequestData, User, LoginResponse, signUpRequestData, GetUser } from "../common/interface/user";
import { LoginAction, LoginSuccessAction, LoginErrorAction, SignupAction, SignupSuccessAction, SignupErrorAction, SignupExistsAction, UserGetByIDAction, UserSuccessAction, UserErrorAction, UserUpdateAction, UserUpdateSuccessAction } from "../common/store/action/auth.action";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { SharedService } from "./shared.service";


@Injectable()
export class Auth {

    constructor(private authService: AuthService, private store: Store<RootReducerState>,
        private router: Router, private toastrService: ToastrService, private sharedService: SharedService) { }

    login(userData?: LoginRequestData, force = false): [Observable<boolean>, Observable<boolean>, Observable<User>] {

        const isAuthenticated$ = this.store.select(getIsAuthenticated);
        const user$ = this.store.select(getUser);
        const hasError$ = this.store.select(getError);

        combineLatest([isAuthenticated$, hasError$]).pipe(take(1)).subscribe((data) => {
            if ((!data[0] && !data[1]) || force) {
                this.store.dispatch(new LoginAction());
                this.authService.login(userData).subscribe((res: LoginResponse) => {
                    if (res && res.Status == 1) {
                        localStorage.setItem('upmetricsCred', JSON.stringify(res.data))
                        this.sharedService.isTaskBoardForce = true;
                        this.sharedService.isProfileForce = true;
                        this.sharedService.user = res.data;
                        this.store.dispatch(new LoginSuccessAction({ data: res.data }))
                        this.router.navigate(['master'])
                    } else {
                        this.toastrService.error(res.message);
                        this.store.dispatch(new LoginErrorAction())
                    }
                }, (error) => {
                    this.store.dispatch(new LoginErrorAction());
                })
            }
        })

        return [isAuthenticated$, hasError$, user$]
    }

    signup(userData: signUpRequestData): [Observable<boolean>, Observable<boolean>, Observable<User>] {
        const isAuthenticated$ = this.store.select(getIsAuthenticated);
        const user$ = this.store.select(getUser);
        const hasError$ = this.store.select(getError);

        combineLatest([isAuthenticated$, hasError$]).pipe(take(1)).subscribe((data) => {
            if ((!data[0] && !data[1])) {
                this.store.dispatch(new SignupAction());
                this.authService.signUp(userData).subscribe((res: LoginResponse) => {
                    if (res && res.Status == 1) {
                        localStorage.setItem('upmetricsCred', JSON.stringify(res.data))
                        this.store.dispatch(new SignupSuccessAction({ data: res.data }))
                        this.router.navigate(['master'])
                    } else if (res.Status == 0) {
                        this.toastrService.error(res.message);
                        this.store.dispatch(new SignupExistsAction())
                    }
                }, (error) => {
                    this.store.dispatch(new SignupErrorAction());
                })
            }
        })

        return [isAuthenticated$, hasError$, user$]
    }

    getUserById(force?: boolean): [Observable<boolean>, Observable<boolean>, Observable<GetUser>, Observable<boolean>] {
        const isLoading$ = this.store.select(getisLoading);
        const isLoaded$ = this.store.select(getisLoaded);
        const user$ = this.store.select(getUserById);
        const userError$ = this.store.select(userError);

        combineLatest([isLoaded$, isLoading$]).pipe(take(1)).subscribe((data) => {
            if ((!data[0] && !data[1]) && force) {
                this.store.dispatch(new UserGetByIDAction());
                this.authService.getUserById(this.sharedService.user.id).subscribe((res) => {
                    if (res && res.Status == 1) {
                        if (this.sharedService.isProfileForce) {
                            this.sharedService.isProfileForce = false;
                        }
                        this.store.dispatch(new UserSuccessAction(res.data))
                    } else {
                        this.store.dispatch(new UserErrorAction());
                        this.toastrService.error(res.message);
                    }
                }, (error) => {
                    this.store.dispatch(new UserErrorAction());
                })
            }
        })

        return [isLoading$, isLoaded$, user$, userError$]
    }

    update(userData: any): [Observable<boolean>, Observable<boolean>, Observable<GetUser>, Observable<boolean>] {
        const isLoading$ = this.store.select(getisLoading);
        const isLoaded$ = this.store.select(getisLoaded);
        const user$ = this.store.select(getUserById);
        const userError$ = this.store.select(userError);

        this.store.dispatch(new UserUpdateAction());
        const user = localStorage.getItem('upmetricsCred');
        if (user) {
            this.authService.updateUser(userData, JSON.parse(user).id, JSON.parse(user).token).subscribe((res) => {
                if (res && res.Status == 1) {
                    this.store.dispatch(new UserUpdateSuccessAction(res.data))
                } else {
                    this.store.dispatch(new UserErrorAction());
                    this.toastrService.error(res.message);
                }
            }, (error) => {
                this.store.dispatch(new UserErrorAction());
            })
        }

        return [isLoading$, isLoaded$, user$, userError$]
    }
}