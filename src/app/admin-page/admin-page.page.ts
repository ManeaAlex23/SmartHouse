import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {FireServiceService} from '../fire-service.service';
import {DatabaseSmartHouse} from '../models/data';
import { Observable } from 'rxjs';
import { database } from 'firebase';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {Router} from '@angular/router'
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.page.html',
  styleUrls: ['./admin-page.page.scss'],
})
export class AdminPagePage implements OnInit {
  arrData =[];
  UsersList$:Observable<DatabaseSmartHouse[]>
  AdminLookingFor:String
  UserKey:String
  constructor(
    private usersService:FireServiceService,
    private fire:AngularFireAuth,
    public db:AngularFireDatabase,
    public rout:Router,

  ) { }

  ngOnInit() {
//this.GetAllUsers();
this.GetfireUsers();
  }

  GetfireUsers(){
    //Do FirebaseAuth.getInstance().getCurrentUser()
    
    
    this.db.list('/users').valueChanges().subscribe(data=>{ 
      this.arrData=data; 
         
     // console.log("Am gasit aici "+JSON.stringify(data));
      // console.log(JSON.stringify(myJsonObj));
      // let data1=myJsonObj.keys('user');
      // console.log(myJsonObj.values());
      //console.log(this.arrData);
      
      
    })
    
  }
 async GetAllUsers(){
    this.UsersList$ =await this.usersService.getUserList().valueChanges();
  }

  async VerifyIfClientSelect(){
    if(this.AdminLookingFor!==null){
     // console.log("Adminul doreste...",this.AdminLookingFor);
      this.UserKey=localStorage.getItem(this.AdminLookingFor.toString());
      localStorage.setItem("Display",this.UserKey.toString());
      //console.log("Cheia este "+this.UserKey);
      if(this.UserKey!==null){
          this.GetSearchingForUser(this.UserKey);
         
      }

    
    }
  }
  GetSearchingForUser(key){
  this.db.list('users/'+key).valueChanges().subscribe(data=>{ 
    this.arrData=data; 
       
    //console.log("Am gasit aici "+JSON.stringify(data));
    // console.log(JSON.stringify(myJsonObj));
    // let data1=myJsonObj.keys('user');
    // console.log(myJsonObj.values());
   // console.log(this.arrData);
    this.rout.navigateByUrl('/display-info-for-admin');
  });
  }


  onChange(SelectedValue){
    //console.log("you have selected user ",SelectedValue);
    this.AdminLookingFor=SelectedValue;
  }
  async SearchForAdminPleasure(){
    
   

      
   }
  


  

}
