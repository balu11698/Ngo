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
import { AdminDashbordComponent } from './admin-dashbord/admin-dashbord.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutComponent,
    PersonDetailsComponent,
    LoginComponent,
    AdminDashbordComponent
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
  ],
  providers: [NavComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
