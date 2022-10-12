import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  isSigned : boolean = false;
  api_url="http://localhost:3000/userList";
  api_url_register="http://localhost:3000/registeredUser";

  constructor(private http: HttpClient) { }
  
  loginUser(cred:any): Observable<any>{
    return this.http.get<any>(this.api_url_register, cred)
  }
  registerUser(cred: any){
    return this.http.post<any>(this.api_url_register, cred)
  }
  postUser(data:any){
    return this.http.post<any>(this.api_url, data)
  }
  putUserData(data: any, id: number){
    return  this.http.put<any>(this.api_url+'/'+id, data)
  }
  getUsers(){
    return this.http.get<any>(this.api_url)
    .pipe(map((res: any)=>{
      return res
    }))
  }
  deleteUser(id: number){
    return  this.http.delete<any>(this.api_url+'/'+id)
  }

}
