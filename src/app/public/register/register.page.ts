import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
//import { HttpClient,HttpHeaders,HttpRequest } from '@angular/common/http';
import {  throwError, Observable,Observer, observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { finalize,map,catchError} from 'rxjs/operators';
import { DataSensor, Proximitate, DataForUser } from '../../models/data';
import {
  HttpClient,HttpHeaders,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import {AlertController} from '@ionic/angular'
import {AngularFireDatabase, AngularFireDatabaseModule, AngularFireObject} from '@angular/fire/database';
//import { Http, Headers, URLSearchParams, Request, RequestOptions, RequestMethod } from '@angular/http';
import{Injectable} from '@angular/core';
import { interval } from 'rxjs';
//import {LoginPage} from '../login/login.page';
import {LoginPage} from '../login/login.page';
//import { EmailComposer} from '@ionic-native/email-composer/ngx';
import { ThrowStmt, collectExternalReferences } from '@angular/compiler';
import { AngularFireAuth } from '@angular/fire/auth';
import {FireServiceService} from '../../fire-service.service'
//import { EmailService} from '../register/email.js';
// const Sendgrid =require('sendgrid');
// Sendgrid.setApiKey("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");
// const express = require('express');
// const bodyParser =require('body-parser');
// const exphbs =require('express-handlebars');
//const nodemailer = require('nodemailer');

@Injectable()

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})


export class RegisterPage implements OnInit {
      dataUser:DataForUser;
      data:DataSensor;
      dataProximitate:Proximitate;
      error:string;
      loading:any;
      myServo:boolean=false;
      servo_request:HttpRequest<any>;
      servo_next:HttpHandler;
      httpOptions:any;
      arrDataUser=[];
      arrDataUser1=[];
      CurrentUser:any;
      temperature:any;
      humidity:any;
      currentId:any;
      TemperatureReference:any;
      dataFirebase = [];
      leaddetails:any;
      result:any;
      items:any;
      allData:any;
      current:any;
      CurrentTemp:any;
  constructor(
   // private emailComposer :EmailComposer,
    public LoginInfo:LoginPage,
    private http:HttpClient,
    public loadingController:LoadingController,
    private authService:AuthenticationService,
    public alert:AlertController,
    public afb:AngularFireDatabase,
    public fire:AngularFireAuth,
    public serv:FireServiceService,
    public Model:DataForUser
    //private email:EmailService,
  ) { this.dataFirebase = [];}

  ngOnInit() {
    
    this.GetfireUser();
   // this.GetAllDataToPresent();
    //this.GETFIREBASEDATA();
   // this.GetUserName();
  // this.GetSomeInFO();
  }


  
  CheckIfUserChooseAreference(){
    if(this.TemperatureReference>0){
      this.afb.object('users/'+this.currentId).update({
        TemperatureReference:this.TemperatureReference});
    }
  }
  GETFIREBASEDATA(){
    

this.afb.object('users/'+this.currentId)
    .valueChanges()
    .subscribe(data => {
        let arr = Object.keys(data);
        this.dataFirebase = [];
       // console.log(this.dataFirebase);

        for (var i = 0; i < arr.length; i++) {
           const object2 = Object.assign({ Key: arr[i] }, data[arr[i]]);
           //this.temperature=object2;
           this.dataFirebase[i]=object2;
            //this.dataFirebase.push(object2);
            console.log(object2);
            
        }
    })
    // this.temperature=Object.keys("name");
    // console.log(this.dataFirebase["name"]);
     // this.temperature=this.dataFirebase.indexOf("name",5);
}
//scores//key//name,score
GetDatainArray(){
  this.GetUserName();
}

GetUserName():AngularFireObject<DataForUser>{
  this.data.name = this.afb.object('users/'+this.currentId).toString();
  console.log("NUmele "+this.data.name);
  return this.afb.object('users/'+this.currentId+'/name');
  
}

GetSomeInFO(){
  this.dataUser.name=this.afb.database.ref("users").child(this.currentId+'/name');
  
}


logoutUser()
{
  this.authService.logout();
  localStorage.removeItem("user");
  localStorage.removeItem("user1");
}
 async GetfireUser(){
    
    this.currentId= await localStorage.getItem("user1");
   // console.log("In user se afla "+this.currentId);

       this.afb.object<DataForUser>('users/'+this.currentId).valueChanges().subscribe(data=>{ 
        //this.temperature=data;
       // this.arrDataUser=data;  
      
       this.result = data; 
     //  console.log("Data " + data);
       // console.log("Result" + this.result);  
      
        this.items = JSON.stringify(this.result);
       // this.data.temperature=this.items; // then convert data to json string
       // console.log("ITEM "+this.items);
         
        this.allData = JSON.parse(this.items); 
       //this.dataUser.email=this.allData.email;
        this.current=this.allData.email;
        this.CurrentTemp=this.allData.temperature;
        //console.log("Current "+this.current);
        this.Model=data;
        // parse json data and pass json string
        //console.log(this.allData['temperature']); // got result of particular string
        this.leaddetails = JSON.parse(JSON.stringify(data));
        //  this.data.temperature=this.leaddetails.toString();
         //console.log(this.leaddetails.name);
       // this.data.temperature=this.arrDataUser[0]; 
        //this.temperature=this.arrDataUser[0];      
      //console.log("Am gasit aici "+JSON.stringify(data));
      // console.log(JSON.stringify(myJsonObj));
      // let data1=myJsonObj.keys('user');
      // console.log(myJsonObj.values());
     // console.log(this.arrDataUser);
      
      this.CurrentUser=localStorage.getItem(this.currentId);

      //console.log("Am ajuns la "+this.currentId);

      localStorage.removeItem("user1");
      
      
    
    })
    
  }

  OpenDoor(){
    //Put command to database
    if(this.myServo===true){
    this.afb.object("users/"+this.currentId).update({
      DoorComand:true,
  
    })
  }
  else {
    this.afb.object("users/"+this.currentId).update({
      DoorComand:false,
    })
  }
  }

 async GetAllDataToPresent(){
   console.log("Id current"+this.currentId);
   var ParhToDataBase=this.afb.database.ref('users');
   var UserIdRef=ParhToDataBase.child(this.currentId.toString());
  var UserName=UserIdRef.child('name');
  var finalPath=UserName.toString();
  console.log(finalPath);
     this.dataUser.name=this.afb.object<DataForUser>(finalPath);
  return this.afb.object<DataForUser>(finalPath);
   
  //  await this.afb.database.ref('user/'+this.currentId).child().once('value', (snapshot) => {
  //     snapshot.forEach(function(child) {
  //     console.log(child.val().email);
  //        });
  //     });
       
  //   this.temperature=this.afb.list('users/Ji8Ua0dWJSSji6m1DPSQvriVXen2').valueChanges().subscribe(data13123=>{ 
  //          //this.data.temperature=data13123.toString();
  // })
//   this.afb.list('users/'+this.currentId.toString()+'/Hum').valueChanges().subscribe(data1=>{ 
//     console.log(JSON.stringify(data1));
// })

// console.log("Umiditatea "+this.temperature);
    //this.data.temperature=this.temperature;
  }

  

    }
  



//   // async Get(){
    
//   //   this.fire.auth().onAuthStateChanged(function(user){
//   //     if(user){
//   //       var name=user.displayName;
//   //       var email=user.email;
//   //       console.log(name,email);
//   //     }
//   //   });
//   // }
 
//   // async sendGrid(){
//   //   const msg = {
//   //     to: 'manea.alexandru1996@gmail.com',
//   //     from: 'manea.alexnadru96@yahoo.com',
//   //     subject: 'SendGrid is Fun',
//   //     text: 'and easy to do anywhere, even with Node.js',
//   //     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//   //   };
//   //   Sendgrid.send(msg);
//   // }

  
// // async main() {
// //   // Generate test SMTP service account from ethereal.email
// //   // Only needed if you don't have a real mail account for testing
  
// //   // create reusable transporter object using the default SMTP transport
// //   let transporter = nodemailer.createTransport({
// //     service:'gmail',
// //     auth: {
// //       user: 'manea.alexandru1996@gmail.com', // generated ethereal user
// //       pass: 'J@nu4ry*', // generated ethereal password
// //     }
// //   });
// //       let mailOptions={
// //         from:'manea.alexandru1996@gmail.com',
// //         to:'manea.alexandru1996@gmail.com',
// //         subject:'testing',
// //         text: 'It works'
// //       };

// //       transporter.SendEmail(mailOptions,function(err,data){
// //         if(err){
// //           console.log("Eroare");

// //         }
// //         else{
// //           console.log("Sent");
// //         }
// //       })
// // }

//   setInterval()
//   {const source = interval(1000);
//     const subscribe =source.subscribe(val => console.log(val))
//   }
//    repeat(functionToRepeat) {
//       setTimeout(()=>{
//         console.log("Repeat call every 1 min");
//         functionToRepeat();
//       },1000);
    
//   }
//   async ionViewWillEnter1() {
  
//     let interval=myInterval(1000);
    
  
//     // Load the data
//     this.prepareDataRequest()
//       .pipe(
//         finalize(async () =>{
//           await this.loading.dismiss();
//         })
//       ).subscribe(
//       data => {
         
//         // Set the data to display in the template
          
//           this.data = data; //.obs.interval(1000).mergeMapTo('https://192.168.1.108/Info').map(res=>res.json())
//           console.log("am gasit aici "+this.data.temperature);
//           console.log("am gasit aici "+this.data.humidity);
//           console.log("am gasit aici "+this.data.dewpoint);
//           console.log("am gasit aici "+this.data.Time);
//           console.log("am gasit aici "+this.data.Systemv);
//         },
//         error => {
//           this.error= 'Error';
          
         
         
//         }
//       );
      
      
//   }
  
//   async ionViewWillEnter() {
//      this.PreiaDate();
//     let interval=myInterval(1000);
    
//     await this.presentLoading();
//     // Load the data
//     this.prepareDataRequest()
//       .pipe(
//         finalize(async () =>{
//           await this.loading.dismiss();
//         })
//       ).subscribe(
//       data => {
         
//         // Set the data to display in the template
          
//           this.data = data; //.obs.interval(1000).mergeMapTo('https://192.168.1.108/Info').map(res=>res.json())
//           console.log("am gasit aici "+this.data.temperature);
//           console.log("am gasit aici "+this.data.humidity);
//           console.log("am gasit aici "+this.data.dewpoint);
//           console.log("am gasit aici "+this.data.Time);
//           console.log("am gasit aici "+this.data.Systemv);
//         },
//         error => {
//           this.error= 'Error';
          
        
          
//         }
//       );
//   }

//   // async SendMail(){

//   // this.emailComposer.isAvailable().then((available: boolean) =>{
//   //   if(available) {
//   //     //Now we know we can send
//   //   }
//   //  });
   
//   //  let email = {
//   //    to: 'manea.alexandru1996@gmail.com',
//   //    cc: 'manea.alexandru96@yahoo.com',
//   //    subject: 'Cordova Mail',
//   //    body: 'How are you? Nice greetings from Leipzig',
//   //    isHtml: true
//   //  }
  
   
//   //  // Send a text message using default options
//   //  this.emailComposer.open(email);

//   // }
//   async presentLoading() {
//     // Prepare a loading controller
//     this.loading = await this.loadingController.create({
//         message: 'Loading...'
//     });
//     // Present the loading controller
//   await this.loading.present();
// }
// async PreiaDate() {
  
//   let interval=myInterval(1000);
  
  
//     this.ProximityData()
//     .pipe(
//       finalize(async () =>{
//         await this.loading.dismiss();
//       })
//     ).subscribe(
//     data1 => {
       
//       // Set the data to display in the template
        
//         this.dataProximitate = data1; //.obs.interval(1000).mergeMapTo('https://192.168.1.108/Info').map(res=>res.json())
//         console.log("am gasit aici "+this.dataProximitate.distance);
//         console.log("am gasit aici "+this.dataProximitate.Time);
        
//       },
//       error => {
//         this.error= 'Error';
        
       
        
//       }
//     );
// }
// private ProximityData(): Observable<any> {
//   // Define the data URL
//   const dataUrl = 'https://192.168.1.109/pericol';//443 HTTPS  http://192.168.1.108:8200
//   // Prepare the request
//   let headers = new HttpHeaders();
//   headers.append("Authorization","Basic");
//    //headers.append('content-type', 'text/plain');
//   // headers.append('Access-Control-Allow-Origin','*');
//    headers.append('Content-Type','application/json');
//   // headers.append('Access-Control-Request-Method' , 'POST');
//   headers.append("Access-Control-Allow-Origin", "*");
//   headers.append("Refresh","5");
  
//    return this.http.get(dataUrl,{headers:headers});
//   // response.forEach(x=> console.log(x));
//   // console.log(response);
//   // .toPromise().then(result=>{
//   //   setTimeout(()=>{
//   //     let showBar=false;
//   //   },1000)
//   // });
 

// }

    

//     private prepareDataRequest(): Observable<any> {
//       // Define the data URL
//       const dataUrl = 'https://192.168.1.109/Info';//443 HTTPS  http://192.168.1.108:8200
//       // Prepare the request
//       let headers = new HttpHeaders();
//       headers.append("Authorization","Basic");
//        //headers.append('content-type', 'text/plain');
//       // headers.append('Access-Control-Allow-Origin','*');
//        headers.append('Content-Type','application/json');
//       // headers.append('Access-Control-Request-Method' , 'POST');
//       headers.append("Access-Control-Allow-Origin", "*");
//       headers.append("Refresh","5");
      
//        return this.http.get(dataUrl,{headers:headers});
//       // response.forEach(x=> console.log(x));
//       // console.log(response);
//       // .toPromise().then(result=>{
//       //   setTimeout(()=>{
//       //     let showBar=false;
//       //   },1000)
//       // });
     
    
//     }



//     OnmyServo(){
      
      
//        console.log("E bifat" + " "+this.myServo);

        

//        if(this.myServo==true){
        
//         //this.sendPostRequest(this.myServo);
//         //this.intercept(this.servo_request,this.servo_next);
//        this.ionViewDidLoad();
       
//        this.myServo=!this.myServo;
//        }
//        else {
//          this.ionViewDidLoad1();
        
//        }
//     }
//     async showAlert(header:string,message:string){
//       const alert =  await this.alert.create({
//         header,
//         message,
//         buttons: ["OK"]
//       })
    
//       await alert.present()
//     }
//     VerifyTemperature(){
//       const value=25;//this.data.temperature;
//       const prag=24;
//       if(value>prag){
//         this.showAlert("Depasire Temperatura","value");
//       }

//     }

 

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
//     const token = "alex";
 
//     //Authentication by setting header with token value
//     if (token) {
//       request = request.clone({
//         setHeaders: {
//           'Authorization': token
//         }
//       });
//     }
 
//     if (!request.headers.has('Content-Type')) {
//       request = request.clone({
//         setHeaders: {
//           'content-type': 'application/json'
//         }
//       });
//     }
 
//     request = request.clone({
//       headers: request.headers.set('Accept', 'application/json')
//     });
 
//         return next.handle(request).pipe(map((event: HttpEvent<any>)=>{
//           if(event instanceof HttpResponse){
//             console.log('event->>>'+" "+event);
//           }
//           return event;
//         }

//          ));
//       }

//       ionViewDidLoad(){
//         this.ionViewWillEnter1();
//         var url='https://192.168.1.109/command';
        
//         let headers = new HttpHeaders();
//         headers.append("Authorization","123456"+123456);
//          //headers.append('content-type', 'text/plain');
//         // headers.append('Access-Control-Allow-Origin','*');
//          headers.append('Content-Type','application/json');
//         // headers.append('Access-Control-Request-Method' , 'POST');
//         headers.append("Access-Control-Allow-Origin", "*");
       
//        // headers.append("Access-Control-Allow-Credentials", "true");
//        // headers.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//         //headers.append("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//         // headers.append('Accept', 'application/json');
//         // headers.append('access-control-allow-origin: *','*');
//         // headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
//         // headers.append('Access-Control-Allow-Headers', '*');
//         // headers.append("Access-Control-Allow-Origin" , "*"),
//         // headers.append('accept','accept-encoding');
//           let body ={
//              "command" : "true"
//           };
          
//           this.http.post(url,JSON.stringify(body),({headers:headers})).pipe(
//             map(data =>{
//               console.log("Iti trimit inapoi: "+JSON.stringify(data));

//             })).subscribe(result =>{
//               //console.log(result);
//               //console.log("Am primit request dau comanda:"+body);
//             }), catchError(err => throwError(err));
         
//       }
//       ionViewDidLoad1(){
//         this.ionViewWillEnter1();
//         var url='https://192.168.1.109/command';
        
//         let headers = new HttpHeaders();
//          //headers.append('content-type', 'text/plain');
//         // headers.append('Access-Control-Allow-Origin','*');
//          headers.append('Content-Type','application/json');
//         // headers.append('Access-Control-Request-Method' , 'POST');
//         headers.append("Access-Control-Allow-Origin", "*");
//         //headers.append("Authorization","123456");
//        // headers.append("Access-Control-Allow-Credentials", "true");
//        // headers.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//         //headers.append("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//         // headers.append('Accept', 'application/json');
//         // headers.append('access-control-allow-origin: *','*');
//         // headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
//         // headers.append('Access-Control-Allow-Headers', '*');
//         // headers.append("Access-Control-Allow-Origin" , "*"),
//         // headers.append('accept','accept-encoding');
//           let body ={
//              "command" : "false"
//           };
          
//           this.http.post(url,JSON.stringify(body),({headers:headers})).pipe(
//             map(data =>{
//               console.log("Iti trimit inapoi: "+JSON.stringify(data));

//             })).subscribe(result =>{
//               //console.log(result);
//               //console.log("Am primit request dau comanda:"+body);
//             }), catchError(err => throwError(err));
//             //this.email.newUserEmail('manea.alexandru1996@gmail.com', 'SmartHouse');
        
//       }
        
         
//                 sendPostRequest(response_servo){
//       if(response_servo){
      
//       this.httpOptions = {
//         headers: new HttpHeaders(
//         {
//           'Content-Type': 'text/plain',
//           'Access-Control-Allow-Origin': '*',
//           'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
//           "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
//         })
//       }

//     let postData = {
//             "command": "true"
           
            
//     }

//     this.http.post('http://192.168.1.108:8200', JSON.stringify(postData), this.httpOptions)
//       .subscribe(data => {
//         console.log(data['_body']);
//        }, error => {
//         console.log(error);
//       });
//   }}

        
      

  

//     }

//     export const myInterval = (intervalTime:number)=>{
//       return new Observable((observer:Observer<number>)=>{
//         let count = 0;
//         const intervalId = setInterval(()=>{
//           observer.next(count);
//           count++;
    
//         },intervalTime);
//         return () =>
//         {
//          intervalId;
//         }
//       });
      
//     };

   

//    export const promiseTimeout = function(ms, promise){

//       // Create a promise that rejects in <ms> milliseconds
//       let timeout = new Promise((resolve, reject) => {
//         let id = setTimeout(() => {
//           clearTimeout(id);
//           reject('Timed out in '+ ms + 'ms.')
//         }, ms)
//       })
    
//       // Returns a race between our timeout and the passed in promise
//       return Promise.race([
//         promise,
//         timeout
//       ])
