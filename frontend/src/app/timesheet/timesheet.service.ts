import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


class DecodedToken {
  exp: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  private uriseg = 'http://photonic.ddns.net/main/api/timesheet/';
  private decodedToken: DecodedToken;

  constructor(private http: HttpClient) {
    this.decodedToken = JSON.parse(localStorage.getItem('auth_meta')) || new DecodedToken();
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

  public login(userData: any): Observable<any> {
    const URI = this.uriseg + '/login';
    return this.http.post(URI, userData).pipe(map(token => {
      // return this.saveToken(token);
    }));
  }






}
