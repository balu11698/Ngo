import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PersonDetailsComponent } from './person-details/person-details.component';

const routes: Routes = [
  {
    path:"Home",component:HomeComponent
  },
  {
    path:"About",component:AboutComponent
  },
  {
    path:"Form",component:PersonDetailsComponent
  },
  {
    path:"Login",component:LoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
