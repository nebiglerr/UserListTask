import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { User } from 'src/app/models/User';
import { Observable } from 'rxjs';
import { Temperatures } from 'src/app/user-list/Temperatures';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = "https://reqres.in/api/users"
  constructor(private httpClient:HttpClient) { }

  getUser():Observable<User[]>{
    
    return this.httpClient.get<User[]>(this.apiUrl);
  }

 

  getUserById(id:number):Observable<User>{
    return this.httpClient.get<User>(this.apiUrl + "/"+id);
  }

  getUserByPage(page:number){
    return this.httpClient.get<Temperatures[]>(this.apiUrl + "?page="+page);
  }

  add(product:User){
    return this.httpClient.post(this.apiUrl,product)
  }
  
  delete(id:number){
    return this.httpClient.delete(this.apiUrl+ "/"+id)
  }

}
