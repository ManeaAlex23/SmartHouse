import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {Route, Router} from '@angular/router'
import {AlertController} from '@ionic/angular'
//import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import {AngularFireDatabase, AngularFireDatabaseModule} from '@angular/fire/database';

import { Observable } from 'rxjs';


// export class AuthService{
//   user$:Observable<firebase.UserInfo>;
// }
@Component({
  selector: 'app-back',
  templateUrl: './back.page.html',
  styleUrls: ['./back.page.scss'],
})
export class BackPage implements OnInit {
  username:string=""
  password:string=""
  cpassword:string=""
  userid:string
  UserNou:boolean
  Items:String
  nameofTheUser:String;
  NumericCodeForUser:number;
  PasswordToChangeAcount:String;
  UserCity:String;
  numberOfLetters:number;
  key:String;
  constructor(
    public firebase:AngularFireAuth,
    public route:Router,
    public alert:AlertController,
    public db:AngularFireDatabase,
    //public ath:AuthService,
  ) { }

  ngOnInit() {

  }
  getNumberOfLetters(){
    let number = this.username.length 

    console.log("numarul de litere al user-ului este : "+number);
    
      this.numberOfLetters=number;
        
      return number;
  }

  PrivateKeyGenerator(){
    this.getNumberOfLetters();
    var text = "";
    var charset= "abcdefghijklmnopqrstuvwxyz"

    for(var i=0; i< Math.pow(this.numberOfLetters,2);i++){
      text+=charset.charAt(Math.floor(Math.random()*charset.length));
    }
    console.log(text);
    this.key=text;
    return text;
  }

  async Register(){
    const{username,password,cpassword}=this
    if(password!==cpassword){
      this.showAlert("Error!","Parolele sunt diferite!!!");
      
    
    }
    
      try{
        const res=await this.firebase.createUserWithEmailAndPassword(username+'@gmail.com',password); 
        console.log(res);
        this.userid=res.user.uid;
        this.UserNou=res.additionalUserInfo.isNewUser;
        // if(res.operationType==="Sign up"){
        //   console.log(JSON.stringify(res.user));
        // }
       
        
       // this.ath.user$=this.firebase.authState;
        
        //const id=this.db.createPushId();
        //this.db
        
      }catch(err){
        console.dir(err);
        this.showAlert("Error",err.message);
      }
      if(this.UserNou){
      this.pushElement();
      let NewUser="true"
        localStorage.setItem("userNou",NewUser);
      
    }
    this.GetElementFromDatabase(); 
  }
  date =new Date()
  myDate: String = new Date(this.date.getTime() - 
  this.date.getTimezoneOffset()+6*3600).toISOString();

  pushElement(){
    
    let pushid=this.db.createPushId();
    this.db.object('users/' +this.userid).set({
      name:this.nameofTheUser,
      password:this.password,
      email:this.username+'@gmail.com',
      id:this.userid,
      createdAt:this.myDate,
      isNew:this.UserNou,
      username:this.username,
      Adresa:this.NumericCodeForUser,
      ParolaDeSchimbare:this.key,
      Oras:this.UserCity
    }).then(()=>{
      console.log("Am atasat informatiile in baza de date");
    })
    this.db.object('NewUser/').set({
      id:this.userid,
      name:this.username
    })
  }
  GetElementFromDatabase(){
    this.db.object('users' +this.userid).snapshotChanges();
    let objdata=this.db.list('/users' );
    console.log("Informatii luate din baza de date "+JSON.stringify(objdata));
    console.log(JSON.stringify(objdata).split);
    this.db.list('/users/'+this.userid).valueChanges().subscribe(data=>{
      console.log("Am gasit aici "+JSON.stringify(data));
      
    })
    
  }
  

  async showAlert(header:string,message:string){
    const alert =  await this.alert.create({
      header,
      message,
      buttons: ["OK"]
    })
  
    await alert.present()
  }
  

}
