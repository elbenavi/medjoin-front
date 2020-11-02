import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMedialReportsComponent } from './user-medial-reports.component';

describe('UserMedialReportsComponent', () => {
  let component: UserMedialReportsComponent;
  let fixture: ComponentFixture<UserMedialReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMedialReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMedialReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
