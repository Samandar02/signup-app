import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pipe } from 'rxjs';
import { UserVM } from '../models/model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apiSvc: ApiService, private router: Router) { }
  me = new UserVM()
 
  ngOnInit(): void {
  }

  OnSubmit(form: UserVM) {
    this.me = form;
    // console.log(this.me)
    this.route.queryParamMap.subscribe(res => {
      this.me.id = res.get('id')?.toString();
    })
    this.apiSvc.editUser(this.me).subscribe(res => {
      this.router.navigate(['me'])
    })
  }
  uploadImage(event: any) {

    const file: File = event.target.files[0];

    this.apiSvc.uploadImg(file).subscribe(res=>{
      console.log(res);
    })

   

  }
}
