import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { pipe } from 'rxjs';
import { UserVM } from '../models/model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(private router:Router) { }
  me = new UserVM('1', 'https://findicons.com/files/icons/2526/bloggers/256/admin.png', 'samandar@mail.ru', '', 'samandar', 'Im full stack dev', '974908957')
  ngOnInit(): void {
  }

  OnSubmit(){
    
    this.router.navigate(['me'])
  }

}
