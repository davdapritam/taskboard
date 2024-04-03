import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateTaskReq, CreateTaskReqRes, DragDrop, TaskGetByIdRes, TaskboardCreateReqRes, TaskboardReq, TaskboardRequestResponse, UpdateTaskboardReq } from '../common/interface/task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'user/getAllUsers')
  }

  createTaskBoard(data: TaskboardReq): Observable<TaskboardCreateReqRes> {
    return this.http.post<TaskboardCreateReqRes>(this.baseUrl + `task/taskboards`, data);
  }

  updateTaskBoard(data: UpdateTaskboardReq, id: string): Observable<any> {
    return this.http.put<any>(this.baseUrl + `task/taskboards/update/${id}`, data);
  }

  getTaskBoardById(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + `task/taskboards/${id}`);
  }

  getAllTaskBoards(id: string): Observable<TaskboardRequestResponse> {
    return this.http.get<TaskboardRequestResponse>(this.baseUrl + `task/user/taskboards/${id}`);
  }

  createTask(data: CreateTaskReq): Observable<CreateTaskReqRes> {
    return this.http.post<CreateTaskReqRes>(this.baseUrl + 'task', data);
  }

  getTaskById(id: string): Observable<TaskGetByIdRes> {
    return this.http.get<TaskGetByIdRes>(this.baseUrl + `task/tasks/${id}`);
  }

  updateTask(data: any, id: string): Observable<CreateTaskReqRes> {
    return this.http.put<CreateTaskReqRes>(this.baseUrl + `task/tasks/update/${id}`, data);
  }

  updateDragDrop(data: DragDrop): Observable<CreateTaskReqRes> {
    return this.http.put<CreateTaskReqRes>(this.baseUrl + `task/taskDragDrop`, data);
  }

  // delete
  deleteTaskBoard(id: string) {
    return this.http.delete<any>(this.baseUrl + `task/taskboards/delete/${id}`);
  }

  deleteTask(taskId: string, boardId: string) {
    return this.http.delete<any>(this.baseUrl + `task/tasks/delete/${taskId}/${boardId}`);
  }

}
