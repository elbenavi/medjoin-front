import { Component, OnInit } from '@angular/core';
import { MedjoinService } from 'src/app/services/medjoin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {

  public subMenu = 1;
  public appointments;
  private user;
  constructor(private medjoinService: MedjoinService, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user.isDoctor) {
      this.router.navigate(['doctorpanel']);
    }

    this.medjoinService.getAppointmentsUserById(this.user.id).subscribe(appointments => {
      this.appointments = appointments;
    });
  }

  changeSubMenu(menuId) {
    this.subMenu = menuId;
  }

}
