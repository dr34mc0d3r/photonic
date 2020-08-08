import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../auth/auth.service';
import { TimesheetService } from '../timesheet.service';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {

  itemForm: FormGroup;
  errors: any = [];
  notify: string = '';

  public userID: string = '';
  public todayDateValue: string;


  constructor(private auth: AuthService, private tsService: TimesheetService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {
    this.userID = this.auth.getUserID();
    this.shortDate();
    this.notify = '';
    this.errors.push('ffsdfdssdfsd sdfs sfsdf');
  }

  public shortDate() {
    let d = new Date();
    let date = d.getDate();
    let month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    let year = d.getFullYear();
    this.todayDateValue = date + "/" + month + "/" + year;
  }

  public timeAMPM() {
    let hours = new Date().getHours();
    let minutes: any = new Date().getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    console.log("strTime: ", strTime);
    return strTime;
  }

  public time24() {
    let hours = new Date().getHours();
    let minutes: any = new Date().getMinutes();
    // let ampm = hours >= 12 ? 'PM' : 'AM';
    // hours = hours % 12;
    // hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes;
    console.log("24 strTime: ", strTime);
    return strTime;
  }

  public time24p1hour() {
    var today = new Date();
    today.setHours(today.getHours() + 1);
    let hours = today.getHours();
    let minutes: any = today.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes;
    console.log("24+ 1 strTime: ", strTime);
    return strTime;
  }

  ngOnInit(): void {
    this.initForm();
  }

  isValidInput(fieldName): boolean {
    return this.itemForm.controls[fieldName].invalid &&
      (this.itemForm.controls[fieldName].dirty || this.itemForm.controls[fieldName].touched);
  }

  public initForm(): void {
    this.itemForm = this.fb.group({
      start_time: [this.time24(), Validators.required],
      end_time: [this.time24p1hour(), Validators.required],
      discription: ['', Validators.required]
    });
  }

  public saveItem() {
    this.errors = [];
    this.itemForm.value.user_id = this.userID;
    console.log(this.itemForm.value);
    this.tsService.save(this.itemForm.value)
      .subscribe((token) => {
        console.log('saved');
      },
        (errorResponse) => {
          console.log(errorResponse);
          this.errors.push(errorResponse.error.error);
        });
  }

}
