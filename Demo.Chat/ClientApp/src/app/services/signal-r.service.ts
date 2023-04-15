import { Injectable, EventEmitter } from '@angular/core';
import { AuthService } from '../auth/services/auth-service.service';
import { config } from '../config';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr'; 
import * as signalR from '@aspnet/signalr';
import { Router } from '@angular/router';
import { Message } from '../models/message';
@Injectable()
export class SignalRService {
  messageReceived = new EventEmitter<Message>();
  connectionEstablished = new EventEmitter<Boolean>();
  private connectionIsEstablished = false;
  private _hubConnection: HubConnection;

  constructor(private authService: AuthService, private router: Router) {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();  
  }

  sendMessage(group:string, message: string) {
    this._hubConnection.invoke('NewMessage',group, message);
  }

  joinGroup(group: string) {
    this._hubConnection.invoke('JoinGroup', group);
  }

  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(`${config.url}ChatHub`, {
        accessTokenFactory: () => {
          return this.authService.getJwtToken();
        }
      })
      .build();
  }


  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
        setTimeout(function () { this.startConnection(); }, 5000);
      });
  }

  private registerOnServerEvents(): void {
  
    this._hubConnection.on('Send', (data: Message) => {
      this.messageReceived.emit(data);
    });
  }
}    
