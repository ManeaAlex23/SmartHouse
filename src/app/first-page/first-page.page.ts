import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.page.html',
  styleUrls: ['./first-page.page.scss'],
})
export class FirstPagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  date = new Date();
  myDate: String = new Date(this.date.getTime() - 
                   this.date.getTimezoneOffset()+3*3600).toISOString();
                   
}
