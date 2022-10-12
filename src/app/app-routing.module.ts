import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from './dash/dash.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NopageComponent } from './nopage/nopage.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component: LoginComponent, pathMatch:'full'},
  {path:'register', component: RegisterComponent, pathMatch:'full'},
  {path:'dashboard', component: DashComponent, pathMatch:'full'},
  {path:'**', component: NopageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
