import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuVideoConsultationComponent } from './menu-video-consultation.component';

describe('MenuVideoConsultationComponent', () => {
  let component: MenuVideoConsultationComponent;
  let fixture: ComponentFixture<MenuVideoConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuVideoConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuVideoConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
