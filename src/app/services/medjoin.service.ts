import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDoctor } from '../interface/IDoctor';
import { IUser } from '../interface/IUser';
import { map } from 'rxjs/operators';
import { IAppointment } from '../interface/IAppointment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MedjoinService {

  private url = 'https://medjoin20200725162501.azurewebsites.net';

  constructor(private http: HttpClient) { }

  getDoctors(): Observable<IDoctor[]> {
    return this.http.get<IDoctor[]>(`${this.url}/api/users/doctors`);
  }

  saveMedicalDetail(medicalDetail: any): Observable<IUser> {
    return this.http.post<any>(`${this.url}/api/medicaldetail`, medicalDetail);
  }

  saveUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.url}/api/users`, user);
  }

  saveFile(formData: any): Observable<any> {
    return this.http.post(`${this.url}/api/users/upload`, formData, {reportProgress: true, observe: 'events'});
  }

  saveImgProfile(formData: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('auth_token')}`
    );
    return this.http.post(`${this.url}/api/users/upload/profile`, formData, {reportProgress: true, observe: 'events', headers});
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.url}/api/users/login`, credentials);
  }

  getUser(credentials: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('auth_token')}`
    );
    return this.http.post(`${this.url}/api/users/data`, credentials, {headers});
  }

  createAppointment(appointment: any) {
    // console.log(localStorage.getItem('auth_token'));
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('auth_token')}`
    );
    return this.http.post(`${this.url}/api/appointment`, appointment, {headers});
  }

  createMedicalReportAppointment(medicalReportAppointment: any) {
    // console.log(localStorage.getItem('auth_token'));
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('auth_token')}`
    );
    return this.http.post(`${this.url}/api/medicalreportappointment`, medicalReportAppointment, {headers});
  }

  getAppointmentsUserById(id): Observable<IAppointment[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('auth_token')}`
    );
    return this.http.get<IAppointment[]>(`${this.url}/api/appointment/${id}`, {headers}).pipe(map(data => {
      const now = moment(Date.now()).format('YYYY-MM-DDTHH:mm:00');
      data.map(e => {
        const isBefore = moment(e.preferredDate).isBefore(moment(Date.now()).format('YYYY-MM-DDTHH:mm:00'));
        e.isPassed = isBefore;
      });
      return data;
    }));
  }

  getAppointmentsUserDoctorById(id): Observable<IAppointment[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('auth_token')}`
    );
    return this.http.get<IAppointment[]>(`${this.url}/api/appointment/doctor/${id}`, {headers}).pipe(map(data => {
      const now = moment(Date.now()).format('YYYY-MM-DDTHH:mm:00');
      data.map(e => {
        const isBefore = moment(e.preferredDate).isBefore(moment(Date.now()).format('YYYY-MM-DDTHH:mm:00'));
        e.isPassed = isBefore;
      });
      return data;
    }));
  }

  uploadMedicalReport(id, formData) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('auth_token')}`
    );
    return this.http.post(`${this.url}/api/medicalreport/upload/${id}`, formData, {reportProgress: true, observe: 'events', headers});
  }

  saveMedicalReport(medicalReport) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('auth_token')}`
    );
    return this.http.post(`${this.url}/api/medicalreport`, medicalReport, {headers});
  }

  getMedicalReport(id) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('auth_token')}`
    );
    return this.http.get(`${this.url}/api/medicalreport/${id}`, {headers});
  }

  getMedicalReportAppointment(id) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('auth_token')}`
    );
    return this.http.get(`${this.url}/api/medicalreport/${id}`, {headers});
  }

  DeleteMedicalReport(id) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('auth_token')}`
    );
    return this.http.delete(`${this.url}/api/medicalreport/${id}`, {headers});
  }

  updateUser(id, user) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('auth_token')}`
    );
    return this.http.put(`${this.url}/api/users/${id}`, user, {headers});
  }

  updateUserProfile(id, profile) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('auth_token')}`
    );
    return this.http.put(`${this.url}/api/users/${id}/profile`, profile, {headers});
  }
}
