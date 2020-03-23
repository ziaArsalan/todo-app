import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVER_API_URL } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient
  ) { }

  getTasks(){
    const httpHeaders = new HttpHeaders({
      'Content-type': 'application/json',
      'auth-token': JSON.parse(localStorage.getItem('user')).token
    })
    return this.http.get(SERVER_API_URL + '/task', {headers: httpHeaders})
  }

  updateTask(taskID, body) {
    const httpHeaders = new HttpHeaders({
      'Content-type': 'application/json',
      'auth-token': JSON.parse(localStorage.getItem('user')).token
    })
    return this.http.post(SERVER_API_URL + '/task/' + taskID, body, {headers: httpHeaders})
  }

  createTask(body) {
    const httpHeaders = new HttpHeaders({
      'Content-type': 'application/json',
      'auth-token': JSON.parse(localStorage.getItem('user')).token
    })
    return this.http.post(SERVER_API_URL + '/task', body, {headers: httpHeaders})
  }

}
