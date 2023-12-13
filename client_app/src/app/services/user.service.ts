import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../global/globals';
import { CreateUserDto, UserDto } from '../global/user-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersBaseUri: string = this.globals.backendUri + "users";

  constructor(private http: HttpClient, private globals: Globals) { }

  createUser(firstName: string, lastName: string, email: string, password: string) {
    const user = {
      firstName,
      lastName,
      email,
      password
    } as CreateUserDto

    return this.http.post<CreateUserDto>(`${this.usersBaseUri}`, user);
  }

  getUserById(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.usersBaseUri}/${id}`);
  }
}
