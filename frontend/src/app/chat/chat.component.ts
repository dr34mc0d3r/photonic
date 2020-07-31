import { Component, OnInit } from '@angular/core';
import { SocketService } from '../service/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(socketService: SocketService) { }

  ngOnInit(): void {
  }

}
