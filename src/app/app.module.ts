import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { VideoConsultationComponent } from './components/video-consultation/video-consultation.component';
import { DoctorProfileComponent } from './components/doctor-profile/doctor-profile.component';
import { BookVideoConsultationComponent } from './components/book-video-consultation/book-video-consultation.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterDoctorComponent } from './components/register-doctor/register-doctor.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { UserAppointmentsComponent } from './components/user-appointments/user-appointments.component';
import { UserMedialReportsComponent } from './components/user-medial-reports/user-medial-reports.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { MenuVideoConsultationComponent } from './components/menu-video-consultation/menu-video-consultation.component';
import { PayOnlineComponent } from './components/pay-online/pay-online.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { NgxFilesizeModule } from 'ngx-filesize';
import { DoctorAppointmentComponent } from './components/doctor-appointment/doctor-appointment.component';
import { HistoryConsultationComponent } from './components/history-consultation/history-consultation.component';
import { DoctorPanelComponent } from './components/doctor-panel/doctor-panel.component';
import { MyAccountDoctorComponent } from './components/my-account-doctor/my-account-doctor.component';
import { MyProfileDoctorComponent } from './components/my-profile-doctor/my-profile-doctor.component';
import { MatIconModule } from '@angular/material/icon';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { BenefitsComponent } from './components/benefits/benefits.component';
import { ImageProfilePipe } from './pipes/image-profile.pipe';
import { UploadMedicalReportComponent } from './components/upload-medical-report/upload-medical-report.component';
import { ConferenceComponent } from './components/conference/conference.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    VideoConsultationComponent,
    DoctorProfileComponent,
    BookVideoConsultationComponent,
    DoctorsComponent,
    RegisterUserComponent,
    RegisterDoctorComponent,
    LoginComponent,
    HomeComponent,
    UserPanelComponent,
    UserAppointmentsComponent,
    UserMedialReportsComponent,
    MyAccountComponent,
    MyProfileComponent,
    MenuVideoConsultationComponent,
    PayOnlineComponent,
    DoctorAppointmentComponent,
    HistoryConsultationComponent,
    DoctorPanelComponent,
    MyAccountDoctorComponent,
    MyProfileDoctorComponent,
    AboutusComponent,
    ContactusComponent,
    BenefitsComponent,
    ImageProfilePipe,
    UploadMedicalReportComponent,
    ConferenceComponent
  ],
  imports: [
    BrowserModule,
    NgxFilesizeModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModalModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DoctorProfileComponent,
    UploadMedicalReportComponent
  ]
})
export class AppModule { }
