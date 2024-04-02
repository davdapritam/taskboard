import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'user/getAllUsers')
  }

  createTaskBoard(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + `task/taskboards`, data);
  }

  updateTaskBoard(data: any, id: string): Observable<any> {
    return this.http.put<any>(this.baseUrl + `task/taskboards/update/${id}`, data);
  }

  getTaskBoardById(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + `task/taskboards/${id}`);
  }

  getAllTaskBoards(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'task/taskboards');
  }

  createTask(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'task', data);
  }

  getTaskById(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + `task/tasks/${id}`);
  }

  updateTask(data: any, id: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + `task/tasks/update/${id}`, data);
  }

  getTasksByBoardId(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + `task/taskboards/${id}`);
  }

  updateDragDrop(data: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + `task/taskDragDrop`, data);
  }

}
