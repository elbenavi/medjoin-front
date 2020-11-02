import { Component, OnInit, Input } from '@angular/core';
import { IAppointment } from 'src/app/interface/IAppointment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.scss']
})
export class DoctorAppointmentComponent implements OnInit {

  @Input()
  public appointments: IAppointment[];
  private newAppointments = [];

  constructor(private router: Router) { }

  ngOnInit() {
    //  console.log(this.appointments);
    // this.appointments.filter(data => data.isPassed === false);
    // if (this.appointments) {
    //   this.appointments.map(element => {
    //     if (element.isPassed) {
    //       this.newAppointments.push(element);
    //     }
    //   });
    // }

  }

  openConfence(appointment) {
    const id = btoa(`${appointment.id}:${appointment.preferredDate}`);
    // console.log(id);

    this.router.navigate(['conference', id]);
  }

}
