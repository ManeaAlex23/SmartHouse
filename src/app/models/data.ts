import { Observable,Observer } from 'rxjs';

export class DataSensor {
    temperature:String;
    name:String
    humidity:number;
    dewpoint:number;
    Systemv:number;
    Time:number;  
}

export class DataForUser{
  CNP:number;
  Oras:String;
  ParolaDeSchimbare:String;
  Leak:String;
  Last_Seen_Online:String;
  Current_Mac_Adress:String;
  TemperatureReference:number; 
  createdAt:String;
  email:String; 
  id:String; 
  isNew:boolean; 
  name: any;
  password:String; 
  temperature:number;
  humidity:number;
}
export class Proximitate{
  distance:number;
  Time:number;
}


  export interface InterfaceDb{
    description: Array<DatabaseSmartHouse>
  }
  export interface DatabaseSmartHouse{
    createdAt:Date;
    email:String;
    name:String;
    password:String;
    // lastdata:unknown
    // temperature:unknown
    // humidity:unknown
    // gasProcent:unknown
    // alarm:unknown
    
  }
