import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth/services/auth-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;

  loggedin: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}
  collapse() {
    this.isExpanded = false;
  }

  public ngOnInit() {
    this.IsloggedIn();
    this.authService.loggedIn.subscribe(data => this.loggedin = data);
  } 

  IsloggedIn() {
    if (this.authService.isTokenExpired() == true || !this.authService.getJwtToken()) {
      this.loggedin = false;
    }
    else {
      this.loggedin = true;
    }
  }
  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  LogOut() {
    this.authService.logout();
    this.IsloggedIn();
    this.router.navigate(['/login']);
  }
}
