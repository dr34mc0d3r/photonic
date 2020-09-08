import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';



// https://bezkoder.com/angular-10-crud-app/
// https://bezkoder.com/angular-mongodb-node-express/



class DecodedToken {
  exp: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  private uriseg = 'https://photonic.ddns.net/main/api/timesheet';

  constructor(private http: HttpClient) {

  }

  public save(formData: any): Observable<any> {
    const URI = this.uriseg + '/add';
    let newUser = {
      "start_time": formData.start_time,
      "end_time": formData.end_time,
      "discription": formData.discription,
      "user_id": formData.user_id
    };
    return this.http.post(URI, newUser);
  }

  public timesheet(id): Observable<any> {
    return this.http.get(`${this.uriseg}/${id}`);
  }


}
