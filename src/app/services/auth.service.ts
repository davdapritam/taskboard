import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse, signUpRequestData } from '../common/interface/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(data: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.baseUrl + 'login', data);
  }

  signUp(data: signUpRequestData): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'signup', data);
  }

  getUserById(id: any): Observable<LoginResponse> {
    return this.http.get<LoginResponse>(this.baseUrl + `user/getUserById/${id}`);
  }

  updateUser(data: any, id: any, token: any): Observable<any> {
    const header = new HttpHeaders({
      'Authorization': `${token}`
    })
    return this.http.put<any>(this.baseUrl + `user/update/${id}`, data, { headers: header });
  }

}
