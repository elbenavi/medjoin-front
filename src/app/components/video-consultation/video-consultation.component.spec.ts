import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoConsultationComponent } from './video-consultation.component';

describe('VideoConsultationComponent', () => {
  let component: VideoConsultationComponent;
  let fixture: ComponentFixture<VideoConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
