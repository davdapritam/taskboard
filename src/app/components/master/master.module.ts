import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MasterComponent } from './master.component';
import { HeaderComponent } from 'src/app/common/components/header/header.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MasterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MasterModule { }
