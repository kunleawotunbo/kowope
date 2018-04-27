import { Injectable, Injector } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import {AuthService } from './auth-service';
import { UtilityService } from '../utility/utility.service';

//https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {
 token = 'sdsad5454sdasd64scs3sfdssfsd';
    constructor(/*public authService: AuthService*/
        public injector: Injector,
        public utilityService: UtilityService,
    ){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        //this.authService.justLog();
        //this.justLog();
        // Used Injector to avoid cyclic dependency error since AuthService has been Injected before
        // in the app.module.ts
        const authService = this.injector.get(AuthService);  // avoid cyclic dependency errors, 
        //authService.justLog();

        /*
        this.utilityService.onConnect();
        this.utilityService.showNoNetworkAlert();

        //var isNetworkAvailable = false;
        var isNetworkOffline = this.utilityService.isOffline();

        console.log("isNetworkOffline :: " + isNetworkOffline);
        if (isNetworkOffline){
            // cancel the http request
            //request.unsubscribe();
           // request.
           //request = Observable
           return null;
        }
        */
        

        request = request.clone({
            
            /*
            setHeaders: {
                Authorization: `Bearer ${this.token}`
            }
            */
        });

        return next.handle(request);
    }

}