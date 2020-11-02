import { Component, OnInit } from '@angular/core';
import { MedjoinService } from 'src/app/services/medjoin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formRegister: FormGroup;
  private credentials;
  public userInvalid = false;

  constructor(private medjoinService: MedjoinService, private fb: FormBuilder, private router: Router, private dataService: DataService) {
    this.createForm();
   }

  ngOnInit() {

  }

  get emailInvalid() {
    return this.formRegister.get('email').invalid && this.formRegister.get('email').touched;
  }

  get passwordInvalid() {
    return this.formRegister.get('password').invalid && this.formRegister.get('password').touched;
  }

  createForm() {
    this.formRegister = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  save() {
    if (this.formRegister.invalid) {
      return Object.values(this.formRegister.controls).forEach(control => {
        control.markAllAsTouched();
      });
    } else {
      this.credentials = this.formRegister.value;

      this.medjoinService.login(this.credentials).subscribe(data => {
        localStorage.setItem('auth_token', data.token);
        this.medjoinService.getUser(this.credentials).subscribe(dataUser => {
          // console.log(dataUser);

          localStorage.setItem('user', JSON.stringify(dataUser));
          this.dataService.isLogged = true;

          if (!dataUser.isDoctor) {
            this.router.navigate(['userpanel']);
          } else {
            this.router.navigate(['doctorpanel']);
          }
        }, err => {
          localStorage.removeItem('auth_token');
        });
      },
      error => {
        console.log(error);
        this.userInvalid = true;
      }
      );
    }
  }
}
