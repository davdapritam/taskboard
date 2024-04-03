import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskBoardComponent } from '../../task/create-task-board/create-task-board.component';
import { TaskService } from 'src/app/services/task.service';
import { CreateTaskComponent } from '../../task/create-task/create-task.component';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import Swal from 'sweetalert2';
import { SharedService } from 'src/app/services/shared.service';
import { Task } from 'src/app/services/task';
import { TaskBoard } from 'src/app/common/interface/task';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  taskBoards: TaskBoard[] = [];

  isLoading: boolean = false;
  isLoaded: boolean = false;
  isError: boolean = false;
  isAlive: boolean = true;

  constructor(public dialog: MatDialog, private taskService: TaskService, private sharedService: SharedService, private task: Task) {

  }

  ngOnInit(): void {
    this.fetchTaskBoards();
  }

  fetchTaskBoards() {

    const isLoading$ = this.task.getTaskboards(this.sharedService.isTaskBoardForce)[0];
    const isLoaded$ = this.task.getTaskboards()[1];
    const taskBoards$ = this.task.getTaskboards()[2];
    const error$ = this.task.getTaskboards()[3];

    isLoaded$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => this.isLoaded = data);
    isLoading$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => this.isLoading = data);
    taskBoards$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => this.taskBoards = data);
    error$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => this.isError = data);

  }

  fetchTaskBoard() {
    this.task.getTaskboards(true);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTaskBoardComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.fetchTaskBoard();
    });
  }

  openEditDialog(boardId: any): void {
    const dialogRef = this.dialog.open(CreateTaskBoardComponent, {
      data: { boardId: boardId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchTaskBoard();
    });
  }

  openTaskDialog(boardID: any): void {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      data: { boardID: boardID },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchTaskBoard();
    });
  }

  getConnectedTaskBoards(currentBoardId: string): string[] {
    return this.taskBoards.map(board => board._id).filter(id => id !== currentBoardId);
  }

  getConnectedDropLists(taskboard: any): string[] {
    const connectedDropListIds = this.taskBoards
      .filter(board => board._id !== taskboard._id)
      .map(board => board._id);

    return connectedDropListIds;
  }


  onTaskDropped(event: CdkDragDrop<any[]>, targetBoard: any) {
    const draggedTask = event.item.data;
    this.updateDragAndDrop(draggedTask, targetBoard);
  }


  updateDragAndDrop(draggedTask: any, targetBoard: any) {
    const data = {
      previousBoardId: draggedTask.boardId,
      currentBoardId: targetBoard._id,
      taskId: draggedTask._id
    }
    this.taskService.updateDragDrop(data).subscribe((res) => {
      if (res && res.Status == 1) {
        this.fetchTaskBoard();
      }
    })
  }

  editTask(task: any, boardID: any) {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      data: { taskId: task._id, boardID: boardID },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchTaskBoard();
    });
  }

  deleteTaskBoard(boardId: string) {
    Swal.fire({
      title: 'Are you sure you want to delete?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        this.taskService.deleteTaskBoard(boardId).subscribe((res) => {
          if (res && res.Status == 1) {
            this.fetchTaskBoard();
            Swal.fire({
              title: 'Removed!',
              text: 'Item removed successfully.',
              icon: 'success',
              showConfirmButton: false,
              showCancelButton: false,
              timer: 2000
            })
          }
        })
      }
    })
  }

  deleteTask(taskId: string, boardId: string) {
    Swal.fire({
      title: 'Are you sure you want to delete?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        this.taskService.deleteTask(taskId, boardId).subscribe((res) => {
          if (res && res.Status == 1) {
            this.fetchTaskBoard();
            Swal.fire(
              'Removed!',
              'Item removed successfully.',
              'success'
            )
          }
        })
      }
    })
  }

}
