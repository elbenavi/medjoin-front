import { Component, OnInit, Input } from '@angular/core';
import { MedjoinService } from 'src/app/services/medjoin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pay-online',
  templateUrl: './pay-online.component.html',
  styleUrls: ['./pay-online.component.scss']
})
export class PayOnlineComponent implements OnInit {

  @Input()
  public appointment;
  @Input()
  public doctor;
  public user;

  constructor(private medjoinService: MedjoinService, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  reserveAppointment() {
    this.medjoinService.createAppointment(this.appointment).subscribe(appointmentS => {
      console.log(appointmentS);
      const appointment: any = appointmentS;
      this.appointment.medicalReports.map(data => {
        const newdata = {
          medicalReportId: data.id,
          AppointmentId: appointment.id
        };
        this.medjoinService.createMedicalReportAppointment(newdata).subscribe(report => {
          console.log('saved', newdata);
        });
        return newdata;
      });
      this.router.navigate(['userpanel']);
    });
  }
}
