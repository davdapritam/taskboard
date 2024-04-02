import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { TaskService } from 'src/app/services/task.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {

  @Input() title: string = '';
  @Input() boardID: string = '';

  taskList: any[] = [];


  constructor(public dialog: MatDialog, private taskService: TaskService) {

  }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasksByBoardId(this.boardID).subscribe((res) => {
      console.log(res);
      if (res && res.Status == 1) {
        this.taskList = res.data.taskIds
        console.log(this.taskList)
      }
    })
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      data: { boardID: this.boardID },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTasks();
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    const draggedTask = event.item.data;
    console.log(draggedTask)
    console.log(this.boardID)

  }

  onTaskDropped(event: CdkDragDrop<any>) {
    const draggedTask = event.item.data.task; // Get the dragged task from the event
    const droppedBoardId = event.container.data.boardId; // Get the ID of the dropped board

    if (event.previousContainer === event.container) {
      // If the task is dropped within the same container (task board),
      // simply move the task within the taskList array
      // Update the taskList or move tasks between task boards as needed
    } else {
      // If the task is dropped in a different container (task board),
      // transfer the task from the previous container to the current container
      // Update the taskList or move tasks between task boards as needed
    }

    // Now you have access to both draggedTask and droppedBoardId
    console.log("Dragged Task:", draggedTask);
    console.log("Dropped Board ID:", droppedBoardId);
  }
}
