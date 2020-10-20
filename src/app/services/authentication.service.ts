import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Storage} from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { GuardsCheckEnd } from '@angular/router';
import { toASCII } from 'punycode';
const TOKEN_KEY= 'signIn';
  
  var response ={
    username:"",
    password:""
  };
  
@Injectable({
  providedIn: 'root'
})


export class AuthenticationService {
    
    authenticationState= new BehaviorSubject(false);
  constructor(private storage: Storage,private plt:Platform) { 
      this.plt.ready().then(()=>{
        this.checkToken();
      });
  }
  login(username,password)
  {
      
      if(username==response.username&&password==response.password)
      {
        this.authenticationState.next(true);

      }
      else {this.authenticationState.next(false);
      console.log("Nu ai voie!!!")}
    return this.storage.set(TOKEN_KEY, response.username).then(res =>{
            
      });
  }

  logout()
  {
    return this.storage.remove(TOKEN_KEY).then(res =>{
        this.authenticationState.next(false);
    });
  }

  isAuthenticated()
  {
    return this.authenticationState.value;
  }
  checkToken(){
          this.authenticationState.next(false);      
    }

  }


  
















