import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/User';
import { UserAddServiceService } from '../services/user-add-service/user-add-service.service';
import {  UserService } from '../services/user-service/user-list-service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user :User = {avatar:"",first_name:"",email:"",id:0,last_name:""};
  userAdd: FormGroup = new FormGroup({});
  constructor(private userAddServiceService :UserAddServiceService,
    private UserService :UserService,
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    private router:Router, 
    private toastService:ToastrService,) { }

  ngOnInit(): void {
    this.addUser()
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
  addUser(){
    this.userAdd = this.formBuilder.group({
      first_name:["",[Validators.required]],
      last_name:["",Validators.required]
    })
  }
  update(){
    let user : User = this.userAdd.value;
    if(this.userAdd.valid){
     
      this.activatedRoute.params.subscribe(params=>{
        console.log(user)
        this.userAddServiceService.update(user,params["id"]).subscribe(data=>{
          if(data != null){
            console.log(data)
            this.toastService.success("Kullanıcı Başarıyla Güncellendi")
            this.delay(500)
          }else{
            console.log("=====HATA=====")
          }
        })
      })

  }
}
async delay(ms: number) {
  await new Promise<void>(resolve => setTimeout(() => resolve(), ms)).then(() => {
    this.router.navigate([""])
 
  });
}
}
