import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  signInForm!: FormGroup;

  constructor(public fb:FormBuilder, public authService:AuthService, public router:Router) {
    this.signInForm = this.fb.group({
      username: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required]],
    });
  }

  ngOnInit(): void {}

  loginUser(){
    this.authService.signIn(this.signInForm.value);
  }


}
