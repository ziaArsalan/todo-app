import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  inProcess
  error;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = formBuilder.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.min(6)]]
    })
  }

  ngOnInit() {
  }

  login() {
    if(this.loginForm.valid){
      this.inProcess = true
      const body = {
        username: this.loginForm.get('username').value,
        password: this.loginForm.get('password').value
      }
      this.authService.login(body).subscribe(res => {
        console.log(res);
        if(res['success']){
          this.inProcess = false;
          this.error = false;
          localStorage.setItem('user', JSON.stringify(res['user']))
          this.router.navigate(['/main/task'])
        }
      }, err => {
        console.log(err);
        this.error = true;
      })
    }
  }

}
