import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, RouteReuseStrategy , Routes } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {IonicStorageModule} from '@ionic/storage';
import { 
  HTTP_INTERCEPTORS, 
  HttpClientModule 
} from '@angular/common/http';
import firebaseConfig from './firebase'
import {AngularFireModule} from '@angular/fire'
import { environment } from 'src/environments/environment';
//import {RegisterPage}from  './public/register/register';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth'
import {LoginPage} from '../../src/app/public/login/login.page';
import { DataForUser } from './models/data';
//import { EmailComposer } from '@ionic-native/email-composer/ngx';
//import { EmailService} from '../../src/app/public/register/email.js';
import * as admin from 'firebase-admin'


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,IonicStorageModule.forRoot(),
  AngularFireModule.initializeApp(firebaseConfig),
  AngularFireAuthModule,
  HttpClientModule  
],
  providers: [
    HttpClient,
    StatusBar,
    LoginPage,
    SplashScreen,
    AngularFireDatabase,
    DataForUser,
    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
 
  bootstrap: [AppComponent]
})
export class AppModule {}
