import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm !: FormGroup
  constructor(private formBuilder: FormBuilder, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    })
  }
  loginUser(){
    this.api.loginUser(this.loginForm).subscribe(
      {next: (res:any)=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(user){
        alert('Login Sucessful');
        this.api.isSigned=true;
        this.loginForm.reset();
        this.router.navigate(['/dashboard']);
      } else{
        alert('No User Found')
      }
    }, error:()=>{
      alert('Something went wrong');
    }})
  }
}
