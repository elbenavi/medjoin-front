import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileDoctorComponent } from './my-profile-doctor.component';

describe('MyProfileDoctorComponent', () => {
  let component: MyProfileDoctorComponent;
  let fixture: ComponentFixture<MyProfileDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfileDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
