import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../global/globals';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authBaseUri: string = this.globals.backendUri + "auth";

  constructor(private http: HttpClient, private globals: Globals) { }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.authBaseUri}/login`, { email, password }).pipe(
      shareReplay(),
      tap(res => this.setSession(res))
    )
    // this is just the HTTP call, 
    // we still need to handle the reception of the token
  }

  private setSession(authResult: { id: string; email: string; admin: string; token: string; expDate: string; }) {
    localStorage.setItem('id', authResult.id);
    localStorage.setItem('email', authResult.email);
    localStorage.setItem('admin', authResult.admin);
    localStorage.setItem('token', authResult.token);
    localStorage.setItem("expires_at", authResult.expDate);
  }

  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
    localStorage.removeItem("expires_at");
  }

  isLoggedIn() {
    return new Date().getUTCSeconds() < this.getExpiration();
  }

  isAdmin() {
    return String(localStorage.getItem('admin')).toLowerCase() === 'true';
  }

  getId() {
    return Number(localStorage.getItem('id'));
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    return Number(localStorage.getItem('expires_at'));
  }
}
