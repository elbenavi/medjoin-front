import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  @Input()
  public appointments;

  constructor() { }

  ngOnInit() {
  }

}
