import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminDashbordComponent } from './admin-dashbord/admin-dashbord.component';
import { AdminGuard } from './admin.guard';
import { ApplicationStatusComponent } from './application-status/application-status.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { OrganisationDashboardComponent } from './organisation-dashboard/organisation-dashboard.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginGuardGuard } from './service/login-guard.guard';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ViewAllUsersComponent } from './view-all-users/view-all-users.component';
import { ViewApplicantsComponent } from './view-applicants/view-applicants.component';
import { ViewUsersComponent } from './view-users/view-users.component';

const routes: Routes = [
  {
    path: "map", component: MapComponent
  },
  {
    path: "", component: HomeComponent
  },
  {
    path: "about", component: AboutComponent
  },
  {
    path: "form", component: PersonDetailsComponent
  },
  {
    path: "login", component: LoginComponent, canActivate:[LoginGuardGuard]
  },
  {
    path: "admin-dashboard", component: AdminDashbordComponent, canActivate: [AdminGuard]
  },
  {
    path: "feedback", component: FeedbackComponent
  },
  {
    path: "signIn", component: SignInComponent, canActivate:[LoginGuardGuard]
  },
  {
    path: "userdashboard", component: UserDashboardComponent,canActivate: [AdminGuard]
  },
  {
    path: "applicationstatus", component: ApplicationStatusComponent
  },
  {
    path: "organisationdashboard", component: OrganisationDashboardComponent,canActivate: [AdminGuard]
  },
  {
    path: "applicants", component: ViewApplicantsComponent
  },
  {
    path: "profile", component: ProfileComponent
  },
  {
    path: "allpersonalusers", component: ViewUsersComponent
  },
  {
    path: "allusers", component: ViewAllUsersComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
