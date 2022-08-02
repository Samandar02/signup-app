import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSignUp } from 'src/app/models/model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private apiSvc:ApiService,private router:Router) { }
  ngOnInit(): void {

  }
  onSubmit(value:UserSignUp){
    this.apiSvc.signUp(value).subscribe(res=>{
      if(res == true){
        this.router.navigate(['signin']);
      }
    })
  }
}
