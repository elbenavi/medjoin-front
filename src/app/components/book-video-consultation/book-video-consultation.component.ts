import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MedjoinService } from 'src/app/services/medjoin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadMedicalReportComponent } from '../upload-medical-report/upload-medical-report.component';

@Component({
  selector: 'app-book-video-consultation',
  templateUrl: './book-video-consultation.component.html',
  styleUrls: ['./book-video-consultation.component.scss']
})
export class BookVideoConsultationComponent implements OnInit {
  @Output()
  sendAppointment = new EventEmitter<string>();
  @Input()
  public doctor;
  private appoinment;
  public formRegister: FormGroup;
  private idDoctor;
  private idUser;
  public user;
  private fileUpload;
  public medicalReports = [];
  public isLogin = false;

  constructor(private medjoinService: MedjoinService, private fb: FormBuilder, private modalService: NgbModal) {
    this.createForm();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user) {
      this.idUser = this.user.id;
      this.isLogin = true;
    }
    if (this.doctor) {
      this.idDoctor = this.doctor.id;
    }

    this.formRegister.reset({
      preferredDate: '',
      preferedTime: '',
      reason: '',
      minutes: 30,
      doctorId: this.idDoctor,
      userId: this.idUser
    });
  }

  get preferedDayInvalid() {
    return this.formRegister.get('preferredDate').invalid && this.formRegister.get('preferredDate').touched;
  }

  get preferedTimeInvalid() {
    return this.formRegister.get('preferredTime').invalid && this.formRegister.get('preferredTime').touched;
  }

  get minutesTimeInvalid() {
    return this.formRegister.get('minutes').invalid && this.formRegister.get('minutes').touched;
  }
  get reasonInvalid() {
    return this.formRegister.get('reason').invalid && this.formRegister.get('reason').touched;
  }

  createForm() {
    this.formRegister = this.fb.group({
      preferredDate: ['', [Validators.required]],
      preferredTime: ['', [Validators.required]],
      minutes: [30, [Validators.required]],
      reason: ['', [Validators.required]],
      doctorId: [this.idDoctor, [Validators.required]],
      userId: [this.idUser, [Validators.required]],
      file: [null],
      fileName: ['']
    });
  }

  save() {
    this.appoinment = this.formRegister.value;
    if (this.formRegister.invalid) {
      return Object.values(this.formRegister.controls).forEach(control => {
        control.markAllAsTouched();
      });
    } else {
      this.appoinment.preferredDate = this.configureDate(this.appoinment);
      this.appoinment.endAppoinment = this.endTime(this.appoinment);
      this.appoinment.medicalReports = this.medicalReports;
      this.sendAppointment.emit(this.appoinment);
    }
  }

  configureDate(appointment) {
    return `${appointment.preferredDate}T${appointment.preferredTime}`;
  }

  endTime(appointment) {
    const date = new Date(`${appointment.preferredDate}`);
    const newDate = new Date(date.setMinutes(date.getMinutes() + (appointment.minutes)));
    return moment( newDate ).format('YYYY-MM-DDTHH:mm');
  }

  uploadFile() {
    const medicalReport = {
      reportName: this.formRegister.value.fileName,
      urlResource: this.fileUpload.name,
      sizeFile: this.fileUpload.size,
      uploadDate: moment().format(),
      userId: this.idUser
    };
    if (medicalReport.urlResource && medicalReport.reportName) {
      const formData = new FormData();
      formData.append('file', this.fileUpload);
      this.medjoinService.saveMedicalReport(medicalReport).subscribe(medical => {
        this.medjoinService.uploadMedicalReport(this.user.id, formData).subscribe(r => {
          // this.getMedicalReports();
        });
      });
    }
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.fileUpload = event.target.files[0];
    }
  }

  // getMedicalReports() {
  //   this.medjoinService.getMedicalReport(this.idUser).subscribe(medicalReports => {
  //     this.medicalReports = medicalReports;
  //   });
  // }

  deleteReport(i) {
    // this.medjoinService.DeleteMedicalReport(medicalReport.id).subscribe(medical => {
    //   this.getMedicalReports();
    // });
    console.log(i);
    this.medicalReports.splice(i, 1);
  }

  uploadMdicalReportModal() {
    const modal = this.modalService.open(UploadMedicalReportComponent);
    modal.result.then(data => {
      this.medicalReports = data;
      return;
    }).catch(err => {
    });
  }

  validateDate() {
    const isBefore = moment(this.formRegister.get('preferredDate').value).isBefore(moment(Date.now()).format('YYYY-MM-DD'));
    if (isBefore) {
      alert('Date can\'t be less tha today');
      this.formRegister.get('preferredDate').setValue('');
    }
    this.formRegister.get('preferredTime').setValue('');
  }

  validateDateTime() {
    const date = this.formRegister.get('preferredDate').value;
    if (!date) {
      alert('Please select the day first');
      this.formRegister.get('preferredTime').setValue('');
      return;
    }
    const time = this.formRegister.get('preferredTime').value;
    const newDate = `${date}T${time}:00`;
    console.log('newDate', newDate);

    const isBefore = moment(this.formRegister.get('preferredDate').value).isBefore(moment(Date.now()).format('YYYY-MM-DDTHH:mm:00'));
    if (isBefore) {
      alert('Date can\'t be less tha today');
      this.formRegister.get('preferredTime').setValue('');
    }
  }
}

