import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private dataService: DataService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean |
      import('@angular/router').UrlTree | import('rxjs').Observable<boolean
      | import('@angular/router').UrlTree> | Promise<boolean | import('@angular/router').UrlTree> {
        if (this.dataService.login()) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
  }
}
