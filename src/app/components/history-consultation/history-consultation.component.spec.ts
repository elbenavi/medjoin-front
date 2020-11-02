import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryConsultationComponent } from './history-consultation.component';

describe('HistoryConsultationComponent', () => {
  let component: HistoryConsultationComponent;
  let fixture: ComponentFixture<HistoryConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
