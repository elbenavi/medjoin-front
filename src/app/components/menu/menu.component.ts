import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['../../app.component.scss']
})
export class MenuComponent implements OnInit {
  public isLogged = false;
  public isDoctor = false;

  constructor(private router: Router, private authService: DataService) { }

  ngOnInit() {
    console.log(localStorage.getItem('auth_token'));
    console.log(localStorage.getItem('user'));
    if (localStorage.getItem('auth_token') !== null && localStorage.getItem('user') !== null) {
      this.authService.isLogged = true;
      this.isLogged = true;
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.isDoctor) {
        this.isDoctor = true;
      } else {
        this.isDoctor = false;
      }
    }
    this.router.events.subscribe(event => {
      if (event.constructor.name === 'NavigationEnd') {
        this.isLogged = this.authService.isLogged;
      }
    });
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    this.isLogged = false;
    this.authService.isLogged = false;
    this.router.navigate(['home']);
  }

}
