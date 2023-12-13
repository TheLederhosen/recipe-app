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

  private setSession(authResult: { userId: string; email: string; token: string; expDate: string; }) {
    console.log(authResult)
    localStorage.setItem('id', authResult.userId);
    localStorage.setItem('email', authResult.email);
    localStorage.setItem('token', authResult.token);
    localStorage.setItem("expires_at", authResult.expDate);
  }

  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem("expires_at");
  }

  isLoggedIn() {
    return new Date().getUTCSeconds() < this.getExpiration();
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    if (expiration === null) {
      return 0;
    } else {
      const expiresAt = JSON.parse(expiration);
      return Number(expiresAt);
    }
  }
}
