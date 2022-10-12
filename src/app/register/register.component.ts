import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private api : ApiService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      mobile: [''],

    })
  }

  signUp(){
    this.api.registerUser(this.registerForm.value).subscribe(
      {next:(res)=>{
      alert('Registered');
      this.registerForm.reset();
        }, error:()=>{
      alert("Something went wrong");
      }
    }
    );
    this.api.postUser(this.registerForm.value).subscribe(
      {next:(res)=>{
      alert('Registered');
      this.registerForm.reset();
      this.router.navigate(['login']);
        }, error:()=>{
      alert("Something went wrong");
      }
    }
    )
  }
    
}
