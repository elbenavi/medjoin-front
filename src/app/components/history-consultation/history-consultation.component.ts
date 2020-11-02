import { Component, OnInit, Input } from '@angular/core';
import { IAppointment } from 'src/app/interface/IAppointment';

@Component({
  selector: 'app-history-consultation',
  templateUrl: './history-consultation.component.html',
  styleUrls: ['./history-consultation.component.scss']
})
export class HistoryConsultationComponent implements OnInit {
  @Input()
  public appointments: IAppointment[];
  constructor() { }

  ngOnInit() {
  }

}
