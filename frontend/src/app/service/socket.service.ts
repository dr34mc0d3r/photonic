import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url = 'http://photonic.ddns.net/flc';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }
}
