import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminDashbordComponent } from './admin-dashbord/admin-dashbord.component';
import { AdminGuard } from './admin.guard';
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
  },
  {
    path:"admin-dashboard",component:AdminDashbordComponent,canActivate:[AdminGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
