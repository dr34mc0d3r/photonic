import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimesheetComponent } from '../timesheet/timesheet.component';

import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  { path: 'timesheet', component: TimesheetComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class TimesheetRoutingModule { }
