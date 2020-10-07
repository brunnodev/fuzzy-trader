import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginData) {
    return this.http.post(`${environment.baseUrl}/auth/login`, loginData)
  }

  signup(signupData) {
    return this.http.post(`${environment.baseUrl}/auth/signup`, signupData)
  }
}
