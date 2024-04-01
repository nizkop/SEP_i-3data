import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "../services/user.service";
import {User} from "../Model/user";


@Injectable({
  providedIn: 'root'
})
export class AuthRoleGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    return new Promise(resolve => {
      this.userService.getCurrentUser().subscribe((response: User) => {
        const roles = route.data['roles'] as Array<string>;
        // @ts-ignore
        if (roles.includes(response.role)) {
          resolve(true);
        } else {
          this.router.navigate(['/login']);
          resolve(false);
        }
      }, error => {
        this.router.navigate(['/login']);
        resolve(false);
      });
    });
  }
}
