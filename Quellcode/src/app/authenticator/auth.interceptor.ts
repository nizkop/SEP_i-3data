import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, tap} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
      return next.handle(cloned).pipe(tap(succ =>{}, err => {
        if (err.status === 403) {
          this.router.navigateByUrl('/login');
        }
      }));
    } else {
      return next.handle(req).pipe(tap(succ => {}, err => {
        if (err.status === 403) {
          //this.router.navigateByUrl('/login');
        }
      }));
    }
  }
}
