import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Store } from "@ngrx/store";
import { RootReducerState, getError, getIsAuthenticated, getUser } from "../common/store/reducer";
import { Observable, combineLatest, take } from "rxjs";
import { LoginRequestData, User, LoginResponse, signUpRequestData } from "../common/interface/user";
import { LoginAction, LoginSuccessAction, LoginErrorAction, SignupAction, SignupSuccessAction, SignupErrorAction, SignupExistsAction } from "../common/store/action/auth.action";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";


@Injectable()
export class Auth {

    constructor(private authService: AuthService, private store: Store<RootReducerState>,
        private router: Router, private toastrService: ToastrService) { }

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
}