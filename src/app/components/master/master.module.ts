import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MasterComponent } from './master.component';
import { HeaderComponent } from 'src/app/common/components/header/header.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateTaskComponent } from '../task/create-task/create-task.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CreateTaskBoardComponent } from '../task/create-task-board/create-task-board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import {
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";

@NgModule({
  declarations: [
    DashboardComponent,
    MasterComponent,
    HeaderComponent,
    CreateTaskComponent,
    CreateTaskBoardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MasterRoutingModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    CdkDropList,
    CdkDrag,
    MatMenuModule,
    SweetAlert2Module
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MasterModule { }
