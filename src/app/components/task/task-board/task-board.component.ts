import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent {

  constructor(public dialog: MatDialog) {

  }


  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTaskComponent);
    // const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
    //   data: { name: this.name, animal: this.animal },
    // });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
