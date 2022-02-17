import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/User';
import {  UserService } from '../services/user-service/user-list-service';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user :User = {avatar:"",first_name:"",email:"",id:0,last_name:""};

  constructor(private UserService :UserService,private activatedRoute:ActivatedRoute) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getProductById(params["id"])
    })  
  }
  getProductById(id:number){

    this.UserService.getUserById(id).subscribe(data=>{
      var datas = JSON.parse(JSON.stringify(data));
      console.log(datas.data)
      this.user =datas.data
    })
  }

}
