import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthModule } from '../auth/auth.module';
import { TimesheetRoutingModule } from './timesheet-routing.module';

import { TimesheetComponent } from './timesheet/timesheet.component';



@NgModule({
  declarations: [TimesheetComponent],
  imports: [
    CommonModule,
    TimesheetRoutingModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class TimesheetModule { }
