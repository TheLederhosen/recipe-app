import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SuccessSnackbarComponent } from '../success-snackbar/success-snackbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Form validation will start after the method is called, additionally an AuthRequest will be sent
   */
  login() {
    if(this.loginForm.valid) {
      const email = this.loginForm.controls['email'].value;
      const password = this.loginForm.controls['password'].value;

      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['']);
          this.openSuccessSnackBar();
        }
      });
    }
  }

  openSuccessSnackBar() {
    this._snackBar.openFromComponent(SuccessSnackbarComponent, {
      data: "User successfully logged in!",
      duration: 5 * 1000,
    });
  }
}
