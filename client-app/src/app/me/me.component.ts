import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserVM } from '../models/model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

  constructor(private apiSvc:ApiService,private router:Router) { }
  me = new UserVM()
  ngOnInit(): void {
    this.apiSvc.getMe().subscribe(res=>{
      this.me = <UserVM>res;

    })
  }
  edit(){
    this.router.navigate(['../edit'],{queryParams:{id:this.me.id}})
  }

}
