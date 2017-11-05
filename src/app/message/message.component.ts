import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { ChatMessage } from '../models/chat-message.model'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage: ChatMessage; //objekt z lastnostmi, ki je inputan v MessageComponent
  userEmail: string;
  userName: string;
  messageContent: string;
  timeStamp: Date = new Date();

  constructor() { }

  ngOnInit(chatMessage = this.chatMessage) {
      this.messageContent = chatMessage.message;
      this.timeStamp = chatMessage.timeSent;
      this.userEmail = chatMessage.email;
      this.userName = chatMessage.userName;
  }

}