import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'test_angular_deno_stack';

  constructor(
    public router: Router,
    public authService: AuthService) {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
