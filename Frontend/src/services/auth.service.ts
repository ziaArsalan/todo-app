import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(body) {
    return this.http.post(SERVER_API_URL + '/login', body)
  }

  signup(body) {
    return this.http.post(SERVER_API_URL + '/signup', body)
  }

}
