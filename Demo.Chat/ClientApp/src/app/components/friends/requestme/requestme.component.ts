
import { Component, OnInit, ViewChild } from '@angular/core';
import { FriendsService } from '../../../services/friends.service';
import { User } from '../../../models/User';
//import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Friend } from '../../../models/friend';
import { AuthService } from '../../../auth/services/auth-service.service';
import { MatListOption } from '@angular/material';

@Component({
  selector: 'app-requestme',
  templateUrl: './requestme.component.html',
  styleUrls: ['./requestme.component.css']
})
export class RequestmeComponent implements OnInit {
  friendRequestForm: FormGroup;
  users: User[] = [];
  requests: Friend[] = [];
  selectedUsers: Friend[] = [];
  @ViewChild('allmySelected', { static: false }) private allmySelected: MatListOption;
  constructor(private friendService: FriendsService, private authService: AuthService,
    private fb: FormBuilder) {

  }

  ngOnInit() {
    this.friendRequestForm = this.fb.group({
      userList: new FormControl(''),
    });
   
    this.friendService.getRequestedFriends()
      .subscribe(success => {
        this.FoundFriends(success)
      });
  }

  FoundFriends(friends) {

    var userId = Number(this.authService.getUserId());
    this.requests = friends.filter(x => x.acceptorId === userId);
  }

  toggleAllSelection() {
    if (this.allmySelected.selected) {
      this.friendRequestForm.controls.userList.patchValue([...this.requests.map(item => item.requestorEmail), 0]);
      this.selectedUsers = this.requests.slice();
    } else {
      this.friendRequestForm.controls.userList.patchValue([]);
      this.selectedUsers = [];
    }
  }
  removeRequest() {
    var deleterequest = this.selectedUsers.slice();
    for (let user of deleterequest) {
      this.friendService.deleteFriendrequest(user.id).subscribe(res => res);
      this.selectedUsers = this.selectedUsers.filter(x => x.requestorEmail != user.requestorEmail);
    }
  }

  acceptRequest(): void {
    var acceptRequest = this.selectedUsers.slice();
    this.friendService.acceptRequestedFriends(this.selectedUsers).subscribe(res => res);
    for (let user of acceptRequest) {    
      this.selectedUsers = this.selectedUsers.filter(x => x.requestorEmail != user.requestorEmail);
    }
  }

  SelectUser(uservalue: Friend) {

    if (this.selectedUsers != null && this.selectedUsers.length > 0) {
      if (this.selectedUsers.filter(x => x.requestorEmail == uservalue.requestorEmail).length > 0) {
        this.selectedUsers = this.selectedUsers.filter(x => x.requestorEmail != uservalue.requestorEmail);
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
}
