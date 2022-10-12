import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../app/service/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private api: ApiService, private router: Router ) { }
  ngOnInit() {
    // if(this.api.isSigned == false){
    //   alert('User is not logged in')
    //   this.router.navigate(['login']);
    // } else{
    //   this.router.navigate(['dashboard']);
    // }
  }
  title = 'UserCRUD Management';
}
