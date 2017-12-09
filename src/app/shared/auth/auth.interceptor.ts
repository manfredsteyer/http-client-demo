import { Injectable, Inject } from '@angular/core';
import { OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { BASE_URL } from '../../crud-helper/base-url.token';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(
        private authStorage: OAuthStorage,
        @Inject(BASE_URL) private baseUrl: string,
        private router: Router) {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        let url = req.url.toLowerCase();

        if (url.startsWith(this.baseUrl)) {
            
            let token = this.authStorage.getItem('access_token');
            let header = 'Bearer ' + token;

            let headers = req.headers
                                .set('Authorization', header);

            req = req.clone({ headers });
        }

        return next.handle(req).pipe(
            map(event => event),
            catchError(err => this.handleError(err))
        )
    }






    handleError(error: HttpErrorResponse) {

        console.error('error intercepted', error);

        if (error.status === 401 || error.status === 403) {
            this.router.navigate(['/home', {needsLogin: true}]);
            return of(null);
        }
        return of(error); 
    }






}