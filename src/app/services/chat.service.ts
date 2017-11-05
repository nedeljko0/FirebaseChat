import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
//import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
//import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';

import { ChatMessage } from '../models/chat-message.model';
 
@Injectable()
export class ChatService {
  user: any;
  chatMessages: FirebaseListObservable<ChatMessage[]>;
  //chatMessages: AngularFireList<any>;
  chatMessage: ChatMessage;
  userName: Observable<string>;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    // this.afAuth.authState.subscribe(auth => {
    //   if(auth !== undefined && auth !== null){
    //     this.user = auth;
    //   }
    // })

    let restaurants = this.db.list('/path');

   }

  sendMessage(msg: string){
    const timestamp = this.getTimeStamp();
    //const email = this.user.email;
    const email = "test@email.com";
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      //userName: this.userName,
      userName: "test-user",
      email: email
    });

    console.log('Called sendMessage!');
  }

  getMessages(): FirebaseListObservable<ChatMessage[]> {
    // query to create our message feed binding
    console.log('calling getMessages()...');
    return this.db.list('messages', {
      query: {
        limitToLast: 25,
        orderByKey: true
      }
    });
  }

  getTimeStamp(){
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                  (now.getUTCMonth() + 1) + '/' +
                  now.getUTCDate();

    const time = now.getUTCHours() + ':' +
                  now.getUTCMinutes() + ':' +
                  now.getUTCSeconds();

    return (date + ' ' + time);
  }

}