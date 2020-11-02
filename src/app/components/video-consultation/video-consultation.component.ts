import { Component, OnInit } from '@angular/core';
import { MedjoinService } from 'src/app/services/medjoin.service';

@Component({
  selector: 'app-video-consultation',
  templateUrl: './video-consultation.component.html',
  styleUrls: ['./video-consultation.component.scss']
})
export class VideoConsultationComponent implements OnInit {

  public doctors = [];
  public subMenu = 1;
  public doctor;
  public appointment;

  constructor(private medjoinService: MedjoinService) { }

  ngOnInit() {
    this.medjoinService.getDoctors().subscribe(doctors => {
      console.log(doctors);

      this.doctors = doctors;
    });
  }

  changeSubMenu(menuId) {
    console.log(menuId);
    if (menuId === 1) {
      this.subMenu = 1;
    } else if (this.subMenu === 2 && this.doctor) {
      this.subMenu = 2;
    } else if (this.subMenu === 3 && this.appointment) {
      this.subMenu = 3;
    }
  }

  getDoctor(event) {
    this.doctor = event;
    this.subMenu = 2;
  }

  getAppointment(event) {
    this.appointment = event;
    this.subMenu = 3;
  }
}
