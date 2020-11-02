import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountDoctorComponent } from './my-account-doctor.component';

describe('MyAccountDoctorComponent', () => {
  let component: MyAccountDoctorComponent;
  let fixture: ComponentFixture<MyAccountDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAccountDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
