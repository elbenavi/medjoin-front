import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MedjoinService } from 'src/app/services/medjoin.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-my-profile-doctor',
  templateUrl: './my-profile-doctor.component.html',
  styleUrls: ['./my-profile-doctor.component.scss']
})
export class MyProfileDoctorComponent implements OnInit {

  public formRegister: FormGroup;
  public user: any;
  public savedSuccessful = false;

  constructor(private fb: FormBuilder, private medjoinService: MedjoinService, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (!this.user) {
      this.router.navigate(['login']);
    }
    this.formRegister.reset({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      ext: this.user.ext,
      phone: this.user.phone,
      date: moment(this.user.date).format('YYYY-MM-DD'),
      height: (this.user.height || 0),
      weight: (this.user.weight || 0),
      aboutYou: this.user.aboutyou,
      address: this.user.address,
      gender: this.user.gender
    });
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

  get aboutYouData() {
    return this.formRegister.get('aboutYou').value;
  }

  createForm() {
    this.formRegister = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      ext: ['', [Validators.required]],
      phone: ['', [Validators.required]],

      date: ['', ],
      height: [0, ],
      weight: [0, ],
      aboutYou: [''],
      gender: [''],
      address: ['', ]
    });
  }

  save() {
    const userTemp = this.formRegister.value;
    userTemp.height = Number(userTemp.height);
    userTemp.weight = Number(userTemp.weight);

    if (this.formRegister.invalid) {
      return Object.values(this.formRegister.controls).forEach(control => {
        control.markAllAsTouched();
      });
    } else {
      this.medjoinService.updateUser(this.user.id, userTemp).subscribe(user => {
        console.log('user updated');

        localStorage.setItem('user', JSON.stringify(user));
        this.ngOnInit();
        this.savedSuccessful = true;
        window.scroll(0, 0);
      });
    }
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      const random = Math.floor(Math.random() * 1000) + 1;

      const fileName = `${this.user.imgProfile}@${this.user.id}_${random}.jpg`;

      formData.append('file', file, fileName);
      this.medjoinService.updateUserProfile(this.user.id, {imgProfile: `${this.user.id}_${random}.jpg`}).subscribe(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.medjoinService.saveImgProfile(formData).subscribe(t => {
          if (t.body) {
            this.user.imgProfile = t.body.fileName;
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(this.user));
            this.ngOnInit();
          }
          });
      });
    }
  }
}
