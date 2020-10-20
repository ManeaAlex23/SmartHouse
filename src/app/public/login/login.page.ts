import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, AlertController, LoadingController, NumericValueAccessor } from '@ionic/angular';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { computeStackId } from '@ionic/angular/directives/navigation/stack-utils';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {BackPageModule}  from '..//..//back/back.module'
import { IfStmt, ThrowStmt } from '@angular/compiler';
import {AngularFireDatabase, AngularFireDatabaseModule} from '@angular/fire/database';
import {DatabaseSmartHouse, DataForUser} from '../../models/data';


import {FireServiceService} from '../../fire-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  UserList:DatabaseSmartHouse
  //private UserList:InterfaceDb;
  username:string =""
  password:string =""
  loading: LoadingController
  registerCredentials ={username:'',password:''};
  encryptedCredentials={encryptedUsername:'',encryptedPassword:''};
   numberOfLetters:any
   Determinant:any
   encryptedString:any
   key:any
   keyMatrix:any[][];
   copyMatrix:any[][];
   adjointMatrix:any[][];
   inverseMatrix:any[][];
   inverseMatrixb:any[][];
   keyUser=[];
   prodoductMatrix:any[];
  content: Content
  userId:String
  CurrentUser:String
  ModelLogin:DataForUser;
  ADMIN_REQUEST:String;
  //Admin_Login:CheckAdminCredentials;
  // DBdata:String:DatabaseSmartHouse;
  
  constructor(
    private userService:FireServiceService,
   // public UsersList: Array<InterfaceDb> = [],
    private nav: NavController,
  private alertCtrl: AlertController,
   private loadingCtrl: LoadingController,
    private authService:AuthenticationService,
    public fiauth: AngularFireAuth,
    public alert:AlertController,
    public afb:AngularFireDatabase,
    ) 
    
    { }


    getNumberOfLetters(){
      let number = this.registerCredentials.username.length 

     // console.log("numarul de litere al user-ului este : "+number);
      
        this.numberOfLetters=number;
          
        return number;
    }
    date = new Date();
myDate: String = new Date(this.date.getTime() - 
                 this.date.getTimezoneOffset()+3*3600).toISOString();
    //ok
    setkeyUser(numberOfLetters,splitUsername){
        let k=0;
        
        
        
        for(let i=0;i<numberOfLetters;i++){
            this.keyUser[i] = (splitUsername.charCodeAt(k))%97;
           
            k++;
        }
          
       // console.log("Cheia pentru user-ul"+" " + this.registerCredentials.username+" este "+ this.keyUser);
        
    }
    //nok

   PrivateKeyGenerator(){
      var text = "";
      var charset= "abcdefghijklmnopqrstuvwxyz"

      for(var i=0; i< Math.pow(this.numberOfLetters,2);i++){
        text+=charset.charAt(Math.floor(Math.random()*charset.length));
      }
    //  console.log(text);
      this.key=text;
      return text;
    }
    //ok
   setKeyMatrix(keyCipher,numberOfLetters){
      let k=0;
      
      this.keyMatrix=[];
        for(let i=0;i<numberOfLetters;i++){
            this.keyMatrix[i]=[];
          for(let j=0;j<numberOfLetters;j++){

            this.keyMatrix[i][j] = (keyCipher.charCodeAt(k)%97);
            k++;
          }
          
        }
       // console.log(this.keyMatrix);
        
    }
    //nok

  async ngOnInit() {
   
    this.ADMIN_REQUEST_Function();
  
  
  }
    // loginAdmin(){

    //   this.afb.object('admin/'+'Alex').set({
    //     usernameAdmin:"ManeaAlexandru",
    //     parolaAdmin:"ieilalicenta10"
    //   })
    //     this.afb.object<CheckAdminCredentials>('admin/'+'Alex').valueChanges().subscribe(AdminData=>{
    //       this.Admin_Login=AdminData

    //       if((this.username===this.Admin_Login.usernameAdmin)&&(this.password===this.Admin_Login.parolaAdmin)){
    //             console.log("Bun venit Admin");
    //             this.nav.navigateRoot(['/admin-page']);
    //             localStorage.removeItem("ADMIN");
    //       }
    //       else {
    //         console.log("Nu esti admin");
    //       }
     
         
          
          
    //     })

    // }
  ADMIN_REQUEST_Function(){
    this.ADMIN_REQUEST=localStorage.getItem("ADMIN");
    console.log("Admin este "+this.ADMIN_REQUEST);
  }
  async EncrytionCodeforUser(keyMatrix,keyUser){
          
          let sum=0;
          let ASCII=97;
          let numberAlfabet=26;
          this.encryptedString="";
          this.prodoductMatrix=[];
          for(let i=0;i<this.numberOfLetters;i++){
            this.prodoductMatrix[i]=[];
            for(let j=0;j<this.numberOfLetters;j++){
              sum+=keyMatrix[i][j]*keyUser[j];
             if(j==this.numberOfLetters-1){
              this.prodoductMatrix[i] = (sum%ASCII)%numberAlfabet;
              
              sum=0;
             }
               
              
            }
          
          }
          
       for(let k=0;k<this.numberOfLetters;k++){
         this.encryptedString+=String.fromCharCode(this.prodoductMatrix[k]+ASCII);
       } 
      //  console.log("User criptat este: "+ this.encryptedString);
  };

  // async EncrytionCodeforPassword(this.registerCredentials.password){

    async showAlert(header:string,message:string){
      const alert =  await this.alert.create({
        header,
        message,
        buttons: ["OK"]
      })
    
      await alert.present()
    }
  // };
  async loginwithfire(){
    const{username,password}=this
    try{
      
      const res = await this.fiauth.signInWithEmailAndPassword(username + '@gmail.com',password)
      //this.UserList.name=res.user.displayName.toString();
      //console.log(this.UserList.name);
      this.userId=res.user.uid;
      // this.afb.object<DataForUser>('users/'+this.userId).valueChanges().subscribe(data=>{
      // this.ModelLogin=data;
      // });
    this.CurrentUser=username;
      if(res.operationType==="signIn"){
        
         
        this.authService.authenticationState.next(true);
        this.registerCredentials.username=username;
        this.registerCredentials.password=password;
        this.getNumberOfLetters();
      this.PrivateKeyGenerator();
     this.setKeyMatrix(this.key,this.numberOfLetters);
      this.setkeyUser(this.numberOfLetters,this.registerCredentials.username);
      this.EncrytionCodeforUser(this.keyMatrix,this.keyUser);
    this.getCopyMatrix(this.keyMatrix,this.numberOfLetters);
    this.GetCurrentUserInfo();
    this.CreateCurrentUser();
//this.nav.navigateRoot(['/register']);
      }
      console.log(res.operationType);
    } catch(err){
      console.dir(err);
      if(err.code==="auth/user-not-found"){
        console.log("Acest user nu exista in baza de date!");
        this.showAlert("Eroare","Nu exista");
      }
      else if(err.code==="auth/invalid-email"){
        console.log("Acest spatiu este gol!");
        this.showAlert("Eroare","Spatiu gol!!");
      }
      else if(err.code==="auth/wrong-password"){
        this.showAlert("Eroare","User sau parola gresita!!");
      }
    }
   // this.GetCurrentUserInfo();
   //this.CreateCurrentUser();
  }
  public login()  {
      //console.log("DASDASDASDAS"+" "+this.registerCredentials.username);
    this.authService.login(this.registerCredentials.username,this.registerCredentials.password);
    this.getNumberOfLetters();
    this.PrivateKeyGenerator();
    this.setKeyMatrix(this.key,this.numberOfLetters);
    this.setkeyUser(this.numberOfLetters,this.registerCredentials.username);
    this.EncrytionCodeforUser(this.keyMatrix,this.keyUser);
    this.getCopyMatrix(this.keyMatrix,this.numberOfLetters);
    
    //this.Inverse(this.numberOfLetters);
    //this.calculateDeterminant(this.numberOfLetters);
     //this.calculateAdjoint(this.keyMatrix,this.numberOfLetters);
     //this.calculateInverse(this.numberOfLetters);
    
  }
  GetCurrentUserInfo(){
    //<InterfaceDb> 
    this.afb.object<DataForUser>('users/'+this.userId).valueChanges().subscribe(data1=>{
      this.ModelLogin=data1
      //this.DBdata=data;

      // console.log("Am gasit aici "+JSON.stringify(data1));
      // console.log(this.userId);
      localStorage.setItem(this.ModelLogin.name.toString(),this.userId.toString());
     
      localStorage.setItem("user",this.userId.toString());
     // console.log("Pun user"+this.userId);

      localStorage.setItem(this.userId.toString(),this.ModelLogin.name.toString());
     
      
      
    })
    
  }

  CreateCurrentUser(){
    var Inainte=localStorage.getItem("user1");
  //  console.log("Inainte "+Inainte);
    localStorage.removeItem("user1");
   // localStorage.removeItem("user");
    localStorage.setItem("user1",this.userId.toString());
  //  var Dupa=localStorage.getItem("user1");
   // console.log("Dupa "+Dupa);
    this.afb.object('CurrentUser/').set({
      CurrentUser:this.CurrentUser,
      CurrentUID:this.userId,
      createdAt:Date.now()
    }).then(()=>{
    //  console.log("Am atasat informatiile in baza de date");
    })
    this.afb.object('users/'+this.userId).update({
      Last_Seen_Online:this.date.toLocaleString()
    })
  }
  

    Inverse(numberOfLetters){
      let p:any;
      let q:any;
     
      this.inverseMatrixb=[];
        for(let i=0;i<numberOfLetters;i++){
                      this.inverseMatrixb[i]=[];
                for(let j=0;j<numberOfLetters;j++){
                    if(i==j){
                      this.inverseMatrixb[i][j]=1;
                    }
                    else{this.inverseMatrixb[i][j]=0;}
                }
                for(let k=0;k<numberOfLetters;k++){
                  
                    for(let i=0;i<numberOfLetters;i++){
                      p=this.copyMatrix[i][k];
                      q=this.copyMatrix[k][k];

                      for(let j=0;j<numberOfLetters;j++){
                        if(i != k){
                          this.copyMatrix[i][j]=this.copyMatrix[i][j]*q - p*this.copyMatrix[k][j];
                          this.inverseMatrixb[i][j]=this.inverseMatrixb[i][j]*q-p*this.inverseMatrixb[k][j];
                        }
                      }
                    }
                }
                for(let i=0;i<numberOfLetters;i++){
                      for(let j=0;j<numberOfLetters;j++){
                        this.inverseMatrixb[i][j]=this.inverseMatrixb[i][j]/this.copyMatrix[i][i];
                      }
                }
              //  console.log("Inversa este: "+this.inverseMatrixb);
        }
    }
  calculateDeterminant(keyMatrix,numberOfLetters){
        let Det=0;
        let sign=1;
        let x:any;
        let temp:any[][]=this.copyMatrix;
        for(let i=0;i<numberOfLetters;i++){
          
         x=this.calculateDeterminant(temp,numberOfLetters-1);
          Det+=sign*keyMatrix[0][i]*x;
          sign=-1*sign;
       
        }

          this.Determinant=Math.round(Det);
      //    console.log(this.Determinant);
        
  }
  getCopyMatrix(keyMatrix,numberOfLetters){
        this.copyMatrix=[];
        let l=0;
        let k=0;
    for(let i=0;i<numberOfLetters;i++){
            this.copyMatrix[i]=[];
        for(let j=0;j<numberOfLetters;j++){
              this.copyMatrix[l][k++]=keyMatrix[i][j];
              if(j==numberOfLetters-1){
                k=0;
                l++;
              }
        }
    }
 //   console.log(this.copyMatrix);
  }
  calculateAdjoint(keyMatrix,numberOfLetters){

      let sign1=1;
      this.adjointMatrix=[];
      let a:any;
      for(let i=0;i<numberOfLetters;i++){
        this.adjointMatrix[i]=[];
          for(let j=0;j<numberOfLetters;j++){
            sign1=((i+j)%2==0)?1:-1;
            a=this.calculateDeterminant(this.copyMatrix,numberOfLetters);
            this.adjointMatrix[i][j]=(sign1)*a;
          }
      }
     // console.log("determinatul este: "+this.Determinant);
    //  console.log("Copia matricii este "+this.copyMatrix);
    //  console.log("Matricea originala este: "+this.keyMatrix);
    //  console.log("Adjucta este: "+this.adjointMatrix);
      

  }
  calculateInverse(numberOfLetters){
        this.inverseMatrix=[];

        for(let i=0;numberOfLetters;i++){
          this.inverseMatrix[i]=[];
          for(let j=0;j<numberOfLetters;j++){
            this.inverseMatrix[i][j]=this.adjointMatrix[i][j]/this.Determinant;
          }
        }
       //   console.log("inversa este : "+this.inverseMatrix);
  }
  
}
