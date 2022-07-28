import { Component, OnInit } from '@angular/core';
declare let AOS:any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
   AOS.init();
  }
  title = 'client-app';

}
