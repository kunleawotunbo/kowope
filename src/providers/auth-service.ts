import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { catchError } from 'rxjs/operators';
import { ConfigService } from '../utility/config.service';
import { Events } from 'ionic-angular';



@Injectable()
export class AuthService {
  public API_URL: string = "";
  public token: string;

  constructor(
    public http: HttpClient,
    public storage: Storage,
    private configService: ConfigService,
    public events: Events
  ) {
    this.API_URL = configService.getAPIURL();
  }

  signUp(first_name, last_name, phone_no, address, user_type, email, password) {

    var payLoad = {
      first_name: first_name,
      last_name: last_name,
      phone_no: phone_no,
      address: address,
      user_type: user_type,
      email: email,
      password: password
    };

    //const token = this.getToken();

    const httpOptions = this.getHeaders();

    const body = JSON.stringify(payLoad);

    var api = this.API_URL + 'user/signup';

    return this.http.post(api, body, httpOptions)
      .pipe(
      catchError(this.handleError)
      );
  }

  signIn(loginDetails: any) {

    var credentials = {
      email: loginDetails.username,
      password: loginDetails.password
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'X-Requested-With': 'XMLHttpRequest', // to suppress 401 browser popup     
      })
    };;

    var api = this.API_URL + 'user/signin';

    return this.http.post(api, credentials, httpOptions)
      .pipe(
      catchError(this.handleError)
      );


  }

  clearStorage() {
    this.storage.remove('token');
    this.storage.remove('currentUser');
    //localStorage.clear();
    localStorage.removeItem('token');
  }

  getCurrentUser(): Promise<string> {
    return this.storage.get('currentUser').then((value) => {
      return value;
    });
  };


  getToken(): Promise<string> {
    return this.storage.get('token').then((value) => {
      return value;
    });
  };

  logout() {
    //this.storage.set('token', '');
    this.storage.remove('token');
    this.storage.remove('currentUser');
    //localStorage.clear();
    localStorage.removeItem('token');
    this.events.publish('user:logout');
  }

  getHeaders() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return httpOptions;
  }

  justLog() {
    console.log("intercept every call...");
  }

  private extractData(res: Response) {
    //let body = res.json();
    let body = res;
    //console.log("Body :: " + body);
    return body || {};
  }
  /**
* Generic Error handle
* @param error The error to be handled
*/
  /*
    private handleError(error: Response | any) {
      // In a real world app, we might use a remote logging infrastructure
      let errMsg: string;
      if (error instanceof Response) {
        // const body = error.json() || '';
        const body = error || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      console.error(errMsg);
      return Observable.throw(errMsg);
    }
    */

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(error);
  };


}
