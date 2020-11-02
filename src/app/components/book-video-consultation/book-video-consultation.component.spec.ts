import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookVideoConsultationComponent } from './book-video-consultation.component';

describe('BookVideoConsultationComponent', () => {
  let component: BookVideoConsultationComponent;
  let fixture: ComponentFixture<BookVideoConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookVideoConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookVideoConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
