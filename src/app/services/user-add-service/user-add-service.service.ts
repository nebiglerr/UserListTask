import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserAddServiceService {

  apiUrl: string = "https://reqres.in/api/users"
  constructor(private httpClient:HttpClient) { }
  
  addUser(user:User){
    return this.httpClient.post(this.apiUrl,user)
  }
  update(product:User,id:number){
    return this.httpClient.post(this.apiUrl+ "/"+id,product)
  }
  
}
