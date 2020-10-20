import { Injectable } from '@angular/core';
import {DatabaseSmartHouse, DataForUser} from '../app/models/data';
import {AngularFireDatabase, AngularFireDatabaseModule, AngularFireObject} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FireServiceService {

  private UserListRef;
  constructor(private dbf:AngularFireDatabase){
      this.UserListRef=this.dbf.list<DatabaseSmartHouse>('/users');

  }

  getUserList(){
    console.log("Acest serviciu contine "+this.UserListRef);
    return this.UserListRef;
    
  }
//  public GetUserName():AngularFireObject<DataForUser>{
//     this.data.name = this.afb.object('users/'+this.currentId+'/name').toString();
//     console.log("NUmele "+this.data.name);
//     return this.afb.object('users/'+this.currentId+'/name');
    
//   }

  
}
