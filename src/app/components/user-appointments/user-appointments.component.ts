import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-appointments',
  templateUrl: './user-appointments.component.html',
  styleUrls: ['./user-appointments.component.scss']
})
export class UserAppointmentsComponent implements OnInit {
  @Input()
  public appointments;

  constructor(private router: Router) { }

  ngOnInit() {

  }

  openConfence(appointment) {
    const id = btoa(`${appointment.id}:${appointment.preferredDate}`);
    // console.log(id);

    this.router.navigate(['conference', id]);
  }

}
