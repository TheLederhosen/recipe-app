import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessSnackbarComponent } from '../success-snackbar/success-snackbar.component';
import { passwordMatchValidator } from 'src/app/global/validators/password-match.validator';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  // TODO: Check passwords match
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar) {
    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z-äöüßÄÖÜ]*'), Validators.maxLength(50)]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z-äöüßÄÖÜ]*'), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
    }, { validators: passwordMatchValidator });
  }

  getErrorMessage(controlName: string, field: string) {
    if (this.registerForm.controls[controlName].hasError('required')) {
      return 'You must enter a value';
    }

    if (this.registerForm.controls[controlName].hasError('email')) {
      return `Not valid email provided`;
    }

    if (this.registerForm.controls[controlName].hasError('pattern')) {
      return `${field} can only include letters and äöü`;
    }

    if (this.registerForm.controls[controlName].hasError('minlength')) {
      return `${field} needs to be at least 8 characters`;
    }

    if (this.registerForm.controls[controlName].hasError('maxlength')) {
      return `${field} is too long`;
    }

    return 'no errors';
  }

  /**
   * Form validation will start after the method is called, additionally an AuthRequest will be sent
   */
  createNewUser() {
    // TODO: Notify user when passwords do not match
    if(this.registerForm.valid) {
      const firstName = this.registerForm.controls['firstname'].value;
      const lastName = this.registerForm.controls['lastname'].value;
      const email = this.registerForm.controls['email'].value;
      const password = this.registerForm.controls['password'].value;

      this.userService.createUser(firstName, lastName, email, password).subscribe({
        next: () => {
          this.router.navigate(['/login']);
          this.openSuccessSnackBar();
        }
      });
    }
  }

  openSuccessSnackBar() {
    this._snackBar.openFromComponent(SuccessSnackbarComponent, {
      data: "User successfully created!",
      duration: 5 * 1000,
    });
  }
}