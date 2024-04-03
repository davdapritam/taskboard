import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { takeWhile } from 'rxjs';
import { Task } from 'src/app/services/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;
  users: any[] = [];
  error: boolean = false;
  isAlive: boolean = true;

  isEdit: boolean = false;
  taskForm!: FormGroup;

  constructor(private task: Task, public dialogRef: MatDialogRef<CreateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private taskService: TaskService, private fb: FormBuilder, private toastrService: ToastrService) {

  }

  ngOnInit(): void {
    this.initTaskForm();
    this.fetchUsers();

    if (this.data.taskId) {
      this.isEdit = true;
      this.getTaskById();
    }
  }

  getTaskById() {
    this.taskService.getTaskById(this.data.taskId).subscribe((res) => {
      if (res && res.Status == 1) {
        this.taskForm.get('title')?.setValue(res.data.title)
        this.taskForm.get('description')?.setValue(res.data.description)
        this.taskForm.get('assign')?.setValue(res.data.assign)
      }
    })
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

  initTaskForm() {
    this.taskForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      assign: new FormControl('', [Validators.required, Validators.email])
    })
  }

  createTask() {
    const data = { ...this.taskForm.value, boardId: this.data.boardID }
    this.taskService.createTask(data).subscribe((res) => {
      if (res && res.Status == 1) {
        this.toastrService.success(res.message);
      } else {
        this.toastrService.error(res.message);
      }
      this.dialogRef.close();
    })
  }

  updateTask() {
    const data = { ...this.taskForm.value, boardId: this.data.boardID }
    this.taskService.updateTask(data, this.data.taskId).subscribe((res) => {
      if (res && res.Status == 1) {
        this.toastrService.success(res.message);
      } else {
        this.toastrService.error(res.message);
      }
      this.dialogRef.close();
    })
  }

  fetchUsers() {
    const isLoading$ = this.task.getAllUsers()[0];
    const user$ = this.task.getAllUsers()[1];
    const userError$ = this.task.getAllUsers()[2];

    isLoading$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => this.isLoading = data);
    user$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => {
      this.users = data
    });
    userError$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => this.error = data);

  }

  closeDialog(): void {
    this.dialogRef.close();
  }


}
