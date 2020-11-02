import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MedjoinService } from 'src/app/services/medjoin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DoctorProfileComponent } from '../doctor-profile/doctor-profile.component';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {

  @Output()
  sendDoctor = new EventEmitter<string>();
  @Input() doctors;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {

  }

  openProfile(doctor) {
    const modalRef = this.modalService.open(DoctorProfileComponent, {size: 'lg'});
    modalRef.componentInstance.doctor = doctor;
  }

  selectDoctor(doctor) {
    this.sendDoctor.emit(doctor);
  }
}
