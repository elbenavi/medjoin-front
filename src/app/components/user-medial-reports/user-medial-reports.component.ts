import { Component, OnInit } from '@angular/core';
import { MedjoinService } from 'src/app/services/medjoin.service';
import * as moment from 'moment';

@Component({
  selector: 'app-user-medial-reports',
  templateUrl: './user-medial-reports.component.html',
  styleUrls: ['./user-medial-reports.component.scss']
})
export class UserMedialReportsComponent implements OnInit {

  public data = {
      file: '',
      fileName: '',
  };
  private fileUpload;
  private idUser;
  private user;
  public medicalReports;

  constructor(private medjoinService: MedjoinService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user) {
      this.idUser = this.user.id;
      this.getMedicalReports();
    }
  }

  uploadFile() {
    if (this.fileUpload) {
      const medicalReport = {
        reportName: this.data.fileName,
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

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.fileUpload = event.target.files[0];
    }
  }

  getMedicalReports() {
    this.medjoinService.getMedicalReport(this.idUser).subscribe(medicalReports => {
      this.medicalReports = medicalReports;
    });
  }

  deleteReport(medicalReport) {
    this.medjoinService.DeleteMedicalReport(medicalReport.id).subscribe(medical => {
      this.getMedicalReports();
    });
  }
}
