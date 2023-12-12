import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { GlobalFunctions } from "../../global/globalFunctions";


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
    private router: Router,) {
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
    console.log(this.registerForm.valid)
  }
}