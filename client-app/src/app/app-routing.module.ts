import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { EditComponent } from './edit/edit.component';
import { MeComponent } from './me/me.component';

const routes: Routes = [
  {path:'',component:SignupComponent},
  {path:'signin',component:SigninComponent},
  {path:'me',component:MeComponent},
  {path:'edit',component:EditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
