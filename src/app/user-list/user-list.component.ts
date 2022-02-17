import { Component, OnInit } from '@angular/core';
import { PagingInfo } from '../models/pagingInfo';
import {  UserService } from '../services/user-service/user-list-service';
import { Temperatures } from './Temperatures';
import { User} from '../models/User';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: User[] = [];
  temperatures: Temperatures[] = [];
  loading: boolean = true
  pagingInfo : PagingInfo = {pageSize:10,currentPage:0,pageCount:0}
  pageArray:number[]=[]
  constructor(private UserService :UserService, 
    private toastService:ToastrService,  
    private router:Router, ) { }

  ngOnInit(): void {
    this.delay(500)
    this.getProductsByPage(2)
  }
  async delay(ms: number) {
    await new Promise<void>(resolve => setTimeout(() => resolve(), ms)).then(() => {
      this.UserService.getUserByPage(2).subscribe(data => {
        this.loading = false;
        this.pagingInfo.pageCount = Math.ceil(data.length/this.pagingInfo.pageSize)
        this.generatePageArray(this.pagingInfo.pageCount)
        console.log(this.pageArray)
      })
    });
  }

  generatePageArray(pageCount:number){
    for (let i = 0; i <pageCount; i++) {     
      this.pageArray.push(i)
    }
  }

  getProductsByPage(page:number){
    this.UserService.getUserByPage(page).subscribe(data=>{
     var datas = JSON.parse(JSON.stringify(data));

      console.log(datas.data)
     let ss= data
      this.userList =datas.data ; 
      this.pagingInfo.currentPage = page
    })
  }
  
  delete(id:number){
    this.UserService.delete(id).subscribe(data => {
      console.log(data)
      this.removeItem(id);
      this.toastService.success("Kullanıcı Başarıyla Silindi")
      console.log(this.userList);
    //  this.delay(1000);
    });
  }
  async removeItem(id:number){
    this.userList = this.userList.filter(item => item.id !== id);
 }
  async delayed(ms: number) {
    await new Promise<void>(resolve => setTimeout(() => resolve(), ms)).then(() => {
      this.router.navigate([""])
   
    });
  }
}
