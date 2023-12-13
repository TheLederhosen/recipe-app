import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { GlobalFunctions } from "../../global/globalFunctions";
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessSnackbarComponent } from '../success-snackbar/success-snackbar.component';


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
      confirm: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
    });
  }

  /**
   * Form validation will start after the method is called, additionally an AuthRequest will be sent
   */
  createNewUser() {
    if(this.registerForm.valid) {
      const firstName = this.registerForm.controls['firstname'].value;
      const lastName = this.registerForm.controls['lastname'].value;
      const email = this.registerForm.controls['email'].value;
      const password = this.registerForm.controls['password'].value;

      this.userService.createUser(firstName, lastName, email, password).subscribe({
        next: () => {
          this.router.navigate(['']);
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