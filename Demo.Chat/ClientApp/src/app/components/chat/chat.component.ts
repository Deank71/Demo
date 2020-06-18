import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EncrDecrService} from '../../services/encr-decr.service';
import { SignalRService } from '../../services/signal-r.service';
import {AuthService  } from '../../auth/services/auth-service.service'
import { Message } from '../../models/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messageForm: FormGroup;
  codeForm: FormGroup;
  reponse: Message = { Message: "", From: "", Group: "" }
  notice: string = "";
  token: string = "";
  constructor(private authService: AuthService, private signalRService: SignalRService, private formBuilder: FormBuilder, private router: Router, private encrDecrService: EncrDecrService) { }
  encryptKey: string = "password";
  encryptPhrase: string = "encrypted";
  public ngOnInit() {
    this.messageForm = this.formBuilder.group({
      message: ['']
    });
    this.codeForm = this.formBuilder.group({
      code: ['']
    });

    if (this.authService.isTokenExpired() == true || !this.authService.getJwtToken()) {

      console.log("Expired Token");
      this.authService.removeTokens();
      this.router.navigate(['login']);
    }
    else {
      console.log("Token is good!");
    }

    // this.signalRService.connectionEstablished;
    this.signalRService.messageReceived.subscribe(data => {
      this.notice = data.from + ": " + this.encrDecrService.get(this.encryptKey, data.message) + "\n" + this.notice;
    }, errors => this.handleErrors(errors));


  }
  private handleErrors(errors: any) {
    //this.message = [];
    for (let msg of errors) {
      alert(msg);
    }
  }

  get f() { return this.messageForm.controls; }

  SendMessage() {
    var encrypted = this.encrDecrService.set(this.encryptKey, this.f.message.value);
    this.signalRService.sendMessage(encrypted);
    this.messageForm.reset();
  }
  SaveCode(newCode) {
    this.encryptKey = newCode.value;
  }
 
}

