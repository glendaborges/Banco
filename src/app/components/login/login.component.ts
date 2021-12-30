import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors  } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerForm!:FormGroup
  errorMessage!:string
  successMessage!:string
  constructor( private authService:AuthService, private route:Router) { }

  ngOnInit() {
    this. registerForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  tryRegister(value:any){
    this.authService.doLogin(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "vc ta logado";
      this.route.navigate(['/user'])
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    })
  }

}
