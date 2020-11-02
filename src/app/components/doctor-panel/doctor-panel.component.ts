import { Component, OnInit } from '@angular/core';
import { MedjoinService } from 'src/app/services/medjoin.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-panel',
  templateUrl: './doctor-panel.component.html',
  styleUrls: ['./doctor-panel.component.scss']
})
export class DoctorPanelComponent implements OnInit {

  public subMenu = 1;
  public appointments;
  public lastAppointments;
  private user;
  constructor(private medjoinService: MedjoinService, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);

    if (!this.user.isDoctor) {
      this.router.navigate(['userpanel']);
    }
    this.medjoinService.getAppointmentsUserDoctorById(this.user.id).subscribe(appointments => {
      // console.log(appointments);
      this.appointments = appointments.filter(data => !data.isPassed);
      this.lastAppointments = appointments.filter(data => data.isPassed);
    });
  }

  changeSubMenu(menuId) {
    this.subMenu = menuId;
  }

}
