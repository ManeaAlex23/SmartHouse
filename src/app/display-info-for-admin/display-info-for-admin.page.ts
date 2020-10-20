import { Component, OnInit } from '@angular/core';
import { DataForUser } from '../models/data';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth'

@Component({
  selector: 'app-display-info-for-admin',
  templateUrl: './display-info-for-admin.page.html',
  styleUrls: ['./register.page.scss'],
})
export class DisplayInfoForAdminPage implements OnInit {
  UserForShow:any;
  date:Date;
  constructor(

    public afb:AngularFireDatabase,
    public ModelToShow:DataForUser,
    public block:AngularFireAuth,
  ) { }

  ngOnInit() {
  this.GetUserIdToDisplay(); 
  
  }
   GetUserIdToDisplay(){
  this.UserForShow=localStorage.getItem('Display');
    //console.log("User Display"+this.UserForShow);
    this.GetAllDataRelatedToThisUser();
  
  }
  GetAllDataRelatedToThisUser(){
    this.afb.object<DataForUser>('users/'+this.UserForShow).valueChanges().subscribe(data1=>{ 
    
    this.ModelToShow=data1;
    console.log("Nume "+this.ModelToShow.name);
     
  
  })
  
  }
    DeleteOrBlockSelectedUser(){
      this.afb.object('users/'+this.ModelToShow.id).remove();
      localStorage.removeItem(this.ModelToShow.name);
      
    }

}
