import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[ApiService]
})
export class AppComponent implements OnInit {
  constructor(private apiSvc:ApiService){}
  isSignedIn:boolean = false;
  ngOnInit(): void {
   this.apiSvc.isSignedIn()
  }

}
