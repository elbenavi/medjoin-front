import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MedjoinService } from 'src/app/services/medjoin.service';
import * as moment from 'moment';

@Component({
  selector: 'app-upload-medical-report',
  templateUrl: './upload-medical-report.component.html',
  styleUrls: ['./upload-medical-report.component.scss']
})
export class UploadMedicalReportComponent implements OnInit {
  public medicalReports;
  public medicalReportsSeleted = [];
  private user;
  private idUser;
  private fileUpload;
  public reportName;

  constructor(public activeModal: NgbActiveModal, private medjoinService: MedjoinService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user) {
      this.idUser = this.user.id;
      this.getMedicalReports();
    }
  }

  getMedicalReports() {
    this.medjoinService.getMedicalReport(this.idUser).subscribe(medicalReports => {
      this.medicalReports = medicalReports;
      console.log(this.medicalReports);
    });
  }

  sendMedicalReports() {
    // console.log(this.medicalReportsSeleted);
    // const medicalReportsSeleted = this.medicalReportsSeleted.map(data => Number(data));
    this.activeModal.close(this.medicalReportsSeleted);
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.fileUpload = event.target.files[0];
    }
  }

  uploadFile() {
    const medicalReport = {
      reportName: this.reportName,
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
          this.getMedicalReports();
        });
      });
    }
  }
}
