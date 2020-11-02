import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MedjoinService } from 'src/app/services/medjoin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  public formRegister: FormGroup;
  private user;
  private password2;
  public emialValid = false;

  constructor(private fb: FormBuilder, private medjoinService: MedjoinService, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
  }

  get nameInvalid() {
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

  createForm() {
    this.formRegister = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]],
      ext: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      isDoctor: [false],
      rol: ['user']
    });
  }

  save() {
    this.user = this.formRegister.value;
    if (this.formRegister.invalid) {
      return Object.values(this.formRegister.controls).forEach(control => {
        control.markAllAsTouched();
      });
    } else {
      console.log(this.user);
      this.medjoinService.saveUser(this.user).subscribe(c => {
        this.router.navigate(['login']);
      }, err => {
        console.log(err);
        console.log(err.error.errors.Email);
        if (err.error.errors.Email) {
          this.emialValid = true;
        }
      });

    }
  }
}
