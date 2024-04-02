import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MasterComponent } from './master.component';
import { HeaderComponent } from 'src/app/common/components/header/header.component';
import { TaskBoardComponent } from '../task/task-board/task-board.component';
import { TaskComponent } from '../task/task/task.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateTaskComponent } from '../task/create-task/create-task.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    DashboardComponent,
    MasterComponent,
    HeaderComponent,
    TaskBoardComponent,
    TaskComponent,
    CreateTaskComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MasterModule { }
