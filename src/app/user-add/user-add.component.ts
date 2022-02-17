import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/User';
import { UserAddServiceService } from '../services/user-add-service/user-add-service.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  userAdd: FormGroup = new FormGroup({});

  constructor(private formBuilder:FormBuilder,private userAddServiceService:UserAddServiceService, private router:Router, private toastService:ToastrService, ) { }

  ngOnInit(): void {
    this.addUser();
  }
  addUser(){
    this.userAdd = this.formBuilder.group({
      first_name:["",[Validators.required]],
      last_name:["",Validators.required]
    })
  }
  login(){
    let user : User = this.userAdd.value;
    if(this.userAdd.valid){
     

    this.userAddServiceService.addUser(user).subscribe(data=>{
      if(data != null){
        console.log(data)
        this.toastService.success("Kullanıcı Başarıyla eklendi")
        this.delay(500)
      }else{
        console.log("=====HATA=====")
      }
    })
  }
}
async delay(ms: number) {
  await new Promise<void>(resolve => setTimeout(() => resolve(), ms)).then(() => {
    this.router.navigate([""])
 
  });
}
}
