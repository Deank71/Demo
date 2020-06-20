
import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../../../services/friends.service';
import { User } from '../../../models/User';
//import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-myrequests',
  templateUrl: './myrequests.component.html',
  styleUrls: ['./myrequests.component.css']
})
export class MyrequestsComponent implements OnInit {
  myRequestForm: FormGroup;
  NewRequestForm: FormGroup;
  users: User[] = [];
  constructor(private friendService:FriendsService,
     private fb: FormBuilder) {
  
  }

  ngOnInit() {
    this.myRequestForm = this.fb.group({
      userList: new FormControl(''),
    });
    this.NewRequestForm = this.fb.group({
      email: ['']
    });

  }

  toggleAllSelection() {

  }

  onNoClick(): void {

  }

  SelectUser(uservalue) {
 
  }


  private handleErrors(errors: any) {

  }

  private completeCallback() {
  }

  get f() { return this.NewRequestForm.controls; }
  request() {
    alert(this.f.email.value);
    this.friendService.RequestFriend(this.f.email.value   )
      .subscribe(success => {
      alert(success)
      });
  }
}
