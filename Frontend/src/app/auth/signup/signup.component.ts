import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup
  inProcess;
  error;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      phone: ["", [Validators.required, Validators.pattern('^[0-9]*$')]]
    })
  }

  ngOnInit() {
  }

  signup(){
    if(this.signupForm.valid){
      this.inProcess = true
      const body = {
        firstName: this.signupForm.get('firstName').value,
        lastName: this.signupForm.get('lastName').value,
        email: this.signupForm.get('email').value,
        password: this.signupForm.get('password').value,
        phone: this.signupForm.get('phone').value
      }
      this.authService.signup(body).subscribe(res => {
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
