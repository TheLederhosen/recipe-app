import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // TODO: Check passwords match
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  /**
   * Form validation will start after the method is called, additionally an AuthRequest will be sent
   */
  login() {
    console.log(this.loginForm.valid)
  }
}
