import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSignIn } from 'src/app/models/model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private apiSvc:ApiService,private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(value:UserSignIn){
    this.apiSvc.signIn(value).subscribe(res=>{
      localStorage.setItem("auth_token",res.toString());
      this.router.navigate(['me'])
    })
  }

}
