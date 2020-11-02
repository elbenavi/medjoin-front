import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoConsultationComponent } from './components/video-consultation/video-consultation.component';
import { BookVideoConsultationComponent } from './components/book-video-consultation/book-video-consultation.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { RegisterDoctorComponent } from './components/register-doctor/register-doctor.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { DoctorPanelComponent } from './components/doctor-panel/doctor-panel.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { BenefitsComponent } from './components/benefits/benefits.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { ConferenceComponent } from './components/conference/conference.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'videoconsultation', component: VideoConsultationComponent },
  { path: 'bookvideoconsultation/:id', component: BookVideoConsultationComponent },
  { path: 'registeruser', component: RegisterUserComponent },
  { path: 'registerdoctor', component: RegisterDoctorComponent },
  { path: 'userpanel', component: UserPanelComponent, canActivate: [AuthGuardService] },
  { path: 'doctorpanel', component: DoctorPanelComponent, canActivate: [AuthGuardService] },
  { path: 'about-us', component: AboutusComponent },
  { path: 'benefits', component: BenefitsComponent },
  { path: 'contact-us', component: ContactusComponent },
  { path: 'login', component: LoginComponent },
  { path: 'conference/:id', component: ConferenceComponent, canActivate: [AuthGuardService] },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
