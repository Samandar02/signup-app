import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isToggled:boolean = false;
  constructor(private router:Router) { }

  ngOnInit(): void {
    document.getElementsByClassName("drop-down-items")[0]
    .setAttribute("style","display:none")
  }
  logOut(){
    this.router.navigate(['']);
  }
  toggle(){
    if(this.isToggled){
      document.getElementsByClassName("drop-down-items")[0]
      .setAttribute("style","display:none")
      this.isToggled = !this.isToggled;
    }
    else{
      document.getElementsByClassName("drop-down-items")[0]
      .setAttribute("style","display:inline-block")
      this.isToggled = !this.isToggled;
    }
  }

}
