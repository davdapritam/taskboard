import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskBoardComponent } from '../../task/create-task-board/create-task-board.component';
import { TaskService } from 'src/app/services/task.service';
import { CreateTaskComponent } from '../../task/create-task/create-task.component';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  taskBoards: any[] = [];
  taskList: any[] = [];

  constructor(public dialog: MatDialog, private taskService: TaskService) {

  }

  ngOnInit(): void {
    this.fetchTaskBoards();
  }

  fetchTaskBoards() {
    this.taskService.getAllTaskBoards().subscribe((res) => {
      if (res && res.Status == 1) {
        this.taskBoards = res.data;
        console.log(this.taskBoards);
      }
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTaskBoardComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.fetchTaskBoards();
    });
  }

  openEditDialog(boardId: any): void {
    const dialogRef = this.dialog.open(CreateTaskBoardComponent, {
      data: { boardId: boardId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchTaskBoards();
    });
  }

  getTasks(boardId: string) {
    this.taskService.getTasksByBoardId(boardId).subscribe((res) => {
      console.log(res);
      if (res && res.Status == 1) {
        this.taskList = res.data.taskIds
        console.log(this.taskList)
      }
    })
  }

  openTaskDialog(boardID: any): void {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      data: { boardID: boardID },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchTaskBoards();
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
    console.log(draggedTask)
    console.log(targetBoard)
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
        this.fetchTaskBoards();
      }
    })
  }

  editTask(task: any, boardID: any) {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      data: { taskId: task._id, boardID: boardID },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchTaskBoards();
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
            this.fetchTaskBoards();
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
            this.fetchTaskBoards();
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
