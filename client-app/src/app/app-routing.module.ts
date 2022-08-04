import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { EditComponent } from './edit/edit.component';
import { MeComponent } from './me/me.component';

const routes: Routes = [
  {path:'',component:SignupComponent},
  {path:'signin',component:SigninComponent},
  {path:'me',component:MeComponent,canActivate:[AuthGuard]},
  {path:'edit',component:EditComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
