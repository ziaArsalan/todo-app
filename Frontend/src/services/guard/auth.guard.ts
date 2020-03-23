import { Injectable, NgZone } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private ngZone: NgZone
    ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return Observable.create(observer => {

      const user = JSON.parse(localStorage.getItem('user')) ;

      if(user && user.token){
        observer.next(true);
      }else{
        localStorage.clear();
        this.ngZone.run(async () => {
          this.router.navigate(['/']);
          observer.next(false);
        })
      }
    });
  }
}
