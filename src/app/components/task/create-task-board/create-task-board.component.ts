import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-create-task-board',
  templateUrl: './create-task-board.component.html',
  styleUrls: ['./create-task-board.component.scss']
})
export class CreateTaskBoardComponent implements OnInit {

  taskBoardForm!: FormGroup;
  isEdit: boolean = false;

  constructor(private fb: FormBuilder,
    private taskService: TaskService, public dialogRef: MatDialogRef<CreateTaskBoardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.initTaskBoardForm();

    if (this.data?.boardId) {
      this.isEdit = true;
      this.getTaskBoardById();
    }
  }

  getTaskBoardById() {
    this.taskService.getTaskBoardById(this.data.boardId).subscribe((res) => {
      console.log(res);
      if (res && res.Status == 1) {
        this.taskBoardForm.get('title')?.setValue(res.data.title);
      }
    })
  }

  initTaskBoardForm() {
    this.taskBoardForm = this.fb.group({
      title: new FormControl('', [Validators.required])
    })
  }

  createTaskBoard() {
    if (this.taskBoardForm.valid) {
      const data = this.taskBoardForm.value;
      this.taskService.createTaskBoard(data).subscribe((res) => {

        if (res && res.Status == 1) {
          this.dialogRef.close();
        }
      })
    } else {
      this.taskBoardForm.markAllAsTouched();
    }
  }

  updateTaskBoard() {
    if (this.taskBoardForm.valid) {
      const data = this.taskBoardForm.value;
      this.taskService.updateTaskBoard(data, this.data.boardId).subscribe((res) => {

        if (res && res.Status == 1) {
          this.dialogRef.close();
        }
      })
    } else {
      this.taskBoardForm.markAllAsTouched();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
