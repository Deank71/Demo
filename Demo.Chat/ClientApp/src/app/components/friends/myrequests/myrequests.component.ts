
import { Component, OnInit, ViewChild } from '@angular/core';
import { FriendsService } from '../../../services/friends.service';
import { User } from '../../../models/User';
//import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Friend } from '../../../models/friend';
import {AuthService } from '../../../auth/services/auth-service.service';
import { MatListOption } from '@angular/material';



@Component({
  selector: 'app-myrequests',
  templateUrl: './myrequests.component.html',
  styleUrls: ['./myrequests.component.css']
})
export class MyrequestsComponent implements OnInit {
  myRequestForm: FormGroup;
  NewRequestForm: FormGroup;
  users: User[] = [];
  requests: Friend[] = [];
  selectedUsers: Friend[] = [];
  @ViewChild('allmySelected', { static: false }) private allmySelected: MatListOption;
  constructor(private friendService:FriendsService, private authService:AuthService,
     private fb: FormBuilder) {
  
  }

  ngOnInit() {
    this.myRequestForm = this.fb.group({
      userList: new FormControl(''),
    });
    this.NewRequestForm = this.fb.group({
      email: ['']
    });
     this.friendService.getRequestedFriends()
      .subscribe(success => {
       this.FoundFriends(success)
      });
  }

  FoundFriends(friends) {

    var userId = Number(this.authService.getUserId());
    this.requests = friends.filter(x => x.requestorId === userId);
  }

  toggleAllSelection() {
    if (this.allmySelected.selected) {
      this.myRequestForm.controls.userList.patchValue([...this.requests.map(item => item.acceptorEmail), 0]);
      this.selectedUsers = this.requests.slice();
    } else {
      this.myRequestForm.controls.userList.patchValue([]);
      this.selectedUsers = [];
    }
  }

  removeRequest() {
    var deleterequest = this.selectedUsers.slice();
    for (let user of deleterequest) {
      this.friendService.deleteFriendrequest(user.id).subscribe(res => res);
      this.selectedUsers = this.selectedUsers.filter(x => x.acceptorEmail != user.acceptorEmail);
    }
  }

  SelectUser(uservalue:Friend) {

    if (this.selectedUsers != null && this.selectedUsers.length > 0) {
      if (this.selectedUsers.filter(x => x.acceptorEmail == uservalue.acceptorEmail).length > 0) {
        this.selectedUsers = this.selectedUsers.filter(x => x.acceptorEmail != uservalue.acceptorEmail);
      }
      else {
        this.selectedUsers.push(uservalue);
      }
    }
    else {
      this.selectedUsers = [];
      this.selectedUsers.push(uservalue);
    }
  }

  private handleErrors(errors: any) {

  }

  private completeCallback() {
  }

  get f() { return this.NewRequestForm.controls; }
  request() {

    this.friendService.RequestFriend(this.f.email.value   )
      .subscribe(success => {
      success
      });
  }
}
