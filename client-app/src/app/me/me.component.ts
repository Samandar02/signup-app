import { Component, OnInit } from '@angular/core';
import { UserVM } from '../models/model';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

  constructor() { }
  me = new UserVM('1', 'https://findicons.com/files/icons/2526/bloggers/256/admin.png', 'samandar@mail.ru', '', 'samandar', 'Im full stack dev', '974908957')
  ngOnInit(): void {

  }

}
