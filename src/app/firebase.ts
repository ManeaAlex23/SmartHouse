const config = {
    apiKey: "AIzaSyAiwPU3eimd9TOTJ6mD8JAAbx3oL1IId_E",
    authDomain: "smarthouse-30da7.firebaseapp.com",
    databaseURL: "https://smarthouse-30da7.firebaseio.com",
    projectId: "smarthouse-30da7",
    storageBucket: "smarthouse-30da7.appspot.com",
    messagingSenderId: "658322231080",
    appId: "1:658322231080:web:f03657ff07e2f7a3980a1d",
    measurementId: "G-GHNMR8JN5K"
  };//firebase configurations

  export default config;


  export class GetElementbyID{
    async GetDatabaseElement(){
      const object=document.getElementById('oject');
      console.log(JSON.stringify(object));
   
     // const dbRef= firebase.database().ref().child('object');
   
    }

    
  }