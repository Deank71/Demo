import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userName: [''],
      email: [''],
      password: ['']
    });
  }

  get f() { return this.registerForm.controls; }
  register() {
    this.authService.register(
      {
        userName: this.f.userName.value,
        email: this.f.email.value,
        password: this.f.password.value
      }
    )
      .subscribe(success => {
        if (success) {
          this.router.navigate(['/login']);
        }
      });
  }
}
