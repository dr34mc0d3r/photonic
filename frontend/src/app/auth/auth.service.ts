import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwt = new JwtHelperService();

class DecodedToken {
  exp: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private uriseg = 'http://photonic.ddns.net/main/api/user';
  private decodedToken: DecodedToken;

  constructor(private http: HttpClient) {
    this.decodedToken = JSON.parse(localStorage.getItem('auth_meta')) || new DecodedToken();
  }

  public register(userData: any): Observable<any> {
    const URI = this.uriseg + '/register';
    let newUser = {
      "name": userData.name,
      "email": userData.email,
      "password": userData.password
    };

    return this.http.post(URI, newUser);
  }

  public login(userData: any): Observable<any> {
    const URI = this.uriseg + '/login';
    return this.http.post(URI, userData).pipe(map(token => {
      return this.saveToken(token);
    }));
  }

  public logout(): void {
    localStorage.removeItem('auth_tkn');
    localStorage.removeItem('auth_meta');

    console.log('logout hit ------ ', this.decodedToken );

    this.decodedToken = new DecodedToken();
  }

  private saveToken(token: any): any {
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('auth_tkn', token);
    localStorage.setItem('auth_meta', JSON.stringify(this.decodedToken));
    return token;
  }

  public isAuthenticated(): boolean {
    if(localStorage.getItem('auth_meta')){
      return true;
    }else{
      return false;
    }
    // return true false if expired
    // return moment().isBefore(moment.unix(this.decodedToken.exp));
  }

  public getUsername(): string {
    return this.decodedToken.name;
  }

  public getUserID(): any {
    return this.decodedToken['_id'];
  }
}
