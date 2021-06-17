import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AboutComponent } from './about/about.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashbordComponent, AdminDashboardDialog, AdminDashboardEmailDialog } from './admin-dashbord/admin-dashbord.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from "@angular/material/dialog";
import { OpenCaseFilterPipe } from './service/open-case-filter.pipe';
import { GenderFilterPipe } from './service/gender-filter.pipe';
import { StateFilterPipe } from './service/state-filter.pipe';
import { OccupationFilterPipe } from './service/occupation-filter.pipe';
import { AffectedReasonFilterPipe } from './service/affected-reason-filter.pipe';
import { MapComponent } from './map/map.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FeedbackComponent } from './feedback/feedback.component';
import { SignInComponent, SignUpDialog } from './sign-in/sign-in.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ApplicationStatusComponent } from './application-status/application-status.component';
import { OrganisationDashboardComponent, OrganisationDashboardSubmitJobDialog } from './organisation-dashboard/organisation-dashboard.component';
import { ViewApplicantsComponent } from './view-applicants/view-applicants.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { JobLocationFilterPipe } from './service/job-location-filter.pipe';
import { WorkingTypeFilterPipe } from './service/working-type-filter.pipe';
import { JobTypeFilterPipe } from './service/job-type-filter.pipe';
import { MatDividerModule } from '@angular/material/divider';
import { ProfileComponent } from './profile/profile.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { ViewAllUsersComponent } from './view-all-users/view-all-users.component';
import { UserFilterPipe } from './service/user-filter.pipe';
// import { Signer } from 'crypto';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutComponent,
    PersonDetailsComponent,
    LoginComponent,
    AdminDashbordComponent,
    AdminDashboardDialog,
    AdminDashboardEmailDialog,
    OpenCaseFilterPipe,
    GenderFilterPipe,
    StateFilterPipe,
    OccupationFilterPipe,
    AffectedReasonFilterPipe,
    MapComponent,
    FeedbackComponent,
    SignInComponent,
    SignUpDialog,
    UserDashboardComponent,
    ApplicationStatusComponent,
    OrganisationDashboardComponent,
    OrganisationDashboardSubmitJobDialog,
    ViewApplicantsComponent,
    JobLocationFilterPipe,
    WorkingTypeFilterPipe,
    JobTypeFilterPipe,
    ProfileComponent,
    ViewUsersComponent,
    ViewAllUsersComponent,
    UserFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FlexLayoutModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    NgxChartsModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatDividerModule
  ],
  providers: [NavComponent, MapComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
