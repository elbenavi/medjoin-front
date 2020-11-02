import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MedjoinService } from 'src/app/services/medjoin.service';
import { IUser } from 'src/app/interface/IUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-doctor',
  templateUrl: './register-doctor.component.html',
  styleUrls: ['./register-doctor.component.scss']
})
export class RegisterDoctorComponent implements OnInit {

  public formRegister: FormGroup;
  private user: IUser;

  constructor(private fb: FormBuilder, private medjoinService: MedjoinService, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
  }

  get firstNameInvalid() {
    return this.formRegister.get('firstName').invalid && this.formRegister.get('firstName').touched;
  }

  get lastNameInvalid() {
    return this.formRegister.get('lastName').invalid && this.formRegister.get('lastName').touched;
  }

  get emailInvalid() {
    return this.formRegister.get('email').invalid && this.formRegister.get('email').touched;
  }

  get extInvalid() {
    return this.formRegister.get('ext').invalid && this.formRegister.get('ext').touched;
  }

  get phoneInvalid() {
    return this.formRegister.get('phone').invalid && this.formRegister.get('phone').touched;
  }

  get passwordInvalid() {
    return this.formRegister.get('password').invalid && this.formRegister.get('password').touched;
  }

  get password2Invalid() {
    const validate = this.formRegister.get('password').value !== this.formRegister.get('password2').value;
    return validate;
  }

  get yearsOfExperienceInvalid() {
    return this.formRegister.get('yearsOfExperience').invalid && this.formRegister.get('yearsOfExperience').touched;
  }

  get professionalDesignationInvalid() {
    return this.formRegister.get('professionalDesignation').invalid && this.formRegister.get('professionalDesignation').touched;
  }

  get urlLicenseCertificateInvalid() {
    return this.formRegister.get('urlLicenseCertificate').invalid && this.formRegister.get('urlLicenseCertificate').touched;
  }

  get academicQualificatinDetailsInvalid() {
    return this.formRegister.get('academicQualificatinDetails').invalid && this.formRegister.get('academicQualificatinDetails').touched;
  }

  get medicalLicenseNumberInvalid() {
    return this.formRegister.get('medicalLicenseNumber').invalid && this.formRegister.get('medicalLicenseNumber').touched;
  }

  get universityInvalid() {
    return this.formRegister.get('university').invalid && this.formRegister.get('university').touched;
  }

  createForm() {
    this.formRegister = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]],
      ext: ['', [Validators.required]],
      phone: ['', [Validators.required]],

      yearsOfExperience: ['', [Validators.required]],
      professionalDesignation: ['', [Validators.required]],
      urlLicenseCertificate: [null, [Validators.required]],
      academicQualificatinDetails: ['', [Validators.required]],
      medicalLicenseNumber: ['', [Validators.required]],
      university: ['', [Validators.required]],
      isDoctor: [true],
      file: [null],
      rol: ['doctor']
    });
  }

  save() {
    this.user = this.formRegister.value;

    if (this.formRegister.invalid) {
      return Object.values(this.formRegister.controls).forEach(control => {
        control.markAllAsTouched();
      });
    } else {
      const file = this.formRegister.get('file').value;
      const fileName = file.name;
      console.log(fileName);
      this.user.urlLicenseCertificate = `${this.user.firstName}${this.user.lastName}${fileName}`;

      const formData = new FormData();
      formData.append('file', file, this.user.urlLicenseCertificate);
      this.medjoinService.saveUser(this.user).subscribe(c => {
        this.user.UserId = c.id;
        this.medjoinService.saveFile(formData).subscribe(t => {
        });
        this.medjoinService.saveMedicalDetail(this.user).subscribe(m => {
          this.router.navigate(['login']);
        });
      });
    }
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formRegister.get('file').setValue(file);
    }
  }
}
