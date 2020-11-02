import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAppointmentsComponent } from './user-appointments.component';

describe('UserAppointmentsComponent', () => {
  let component: UserAppointmentsComponent;
  let fixture: ComponentFixture<UserAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
