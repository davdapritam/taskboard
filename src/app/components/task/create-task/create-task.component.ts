import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { takeWhile } from 'rxjs';
import { Task } from 'src/app/services/task';

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

  constructor(private task: Task, public dialogRef: MatDialogRef<CreateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {

  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

  fetchUsers() {
    const isLoading$ = this.task.getAllUsers()[0];
    const user$ = this.task.getAllUsers()[1];
    const userError$ = this.task.getAllUsers()[2];

    isLoading$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => this.isLoading = data);
    user$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => {
      this.users = data
      console.log(this.users);
    });
    userError$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => this.error = data);

  }

  closeDialog(): void {
    this.dialogRef.close();
  }


}
