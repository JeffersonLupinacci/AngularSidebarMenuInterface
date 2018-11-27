import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  logging: Boolean = false;
  user_message: string = null;

  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.nullValidator, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.nullValidator]),
      remember: new FormControl('', [])
    });
    this.auth.logout();
  }

  onSubmit(value: any) {
    this.logging = true;
    this.user_message = null;

    this.auth.login(this.loginForm.value)
      .then(result => {
        this.logging = false;
        this.router.navigate(['/dashboard']);
      })
      .catch(erro => {
        this.logging = false;
        this.user_message = erro;
        this.loginForm.controls['password'].reset();
      });
  }

}
