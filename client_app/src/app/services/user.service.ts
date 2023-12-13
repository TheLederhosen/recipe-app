import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../global/globals';
import { CreateUserDto } from '../global/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUri: string = this.globals.backendUri;

  constructor(private http: HttpClient, private globals: Globals) { }

  createUser(firstName: string, lastName: string, email: string, password: string) {
    const user = {
      firstName,
      lastName,
      email,
      password
    } as CreateUserDto

    return this.http.post<CreateUserDto>(`${this.baseUri}auth/register`, user);
  }

}
