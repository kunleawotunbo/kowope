import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { ConfigService } from '../utility/config.service';
import { Events } from 'ionic-angular';



@Injectable()
export class AuthService {
  public API_URL: string = "";
  public token: string;

  constructor(
    public http: Http, public storage: Storage, 
    private configService: ConfigService,
    public events: Events
  ) {
    this.API_URL = configService.getAPIURL();
  }

  /*
  signIn(loginDetails: any) {
    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest', // to suppress 401 browser popup     
    });
    var credentials = {
      email: loginDetails.username,
      password: loginDetails.password
    }
    return this.http.post(this.API_URL + 'user/signin',
      credentials,
      { headers: headers })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let resp = response.json();
        if (resp.user && resp.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
         // localStorage.setItem('currentUser', JSON.stringify(resp.user));
         // localStorage.setItem('token', resp.token);
         
        // localStorage.setItem('currentUser', JSON.stringify(resp.user));
         //localStorage.setItem('token', resp.token);
         this.storage.set('currentUser', JSON.stringify(resp.user));
         this.storage.set('token', resp.token);
        }
      });
  }
  */

  signIn(loginDetails: any) {
    let headers = new Headers({
      'X-Requested-With': 'XMLHttpRequest', // to suppress 401 browser popup     
    });
    var credentials = {
      email: loginDetails.username,
      password: loginDetails.password
    }

    let options = new RequestOptions({
      headers: headers
    });

    var api = this.API_URL + 'user/signin';
    return this.http.post(api, credentials, options)
      .map(this.extractData)
      .catch(this.handleError);

    /*
    return this.http.post(this.API_URL + 'user/signin',
      credentials,
      { headers: headers })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let resp = response.json();
        if (resp.user && resp.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
         // localStorage.setItem('currentUser', JSON.stringify(resp.user));
         // localStorage.setItem('token', resp.token);
         
        // localStorage.setItem('currentUser', JSON.stringify(resp.user));
         //localStorage.setItem('token', resp.token);
         this.storage.set('currentUser', JSON.stringify(resp.user));
         this.storage.set('token', resp.token);
        }
      });
      */
  }

  clearStorage(){
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

  getUserList() {

    //this.token = localStorage.getItem("token");
    this.getToken().then((token) => {
      this.token = token
    });
    let headers = new Headers({
      'Authorization': 'Basic ' + this.token,
      'X-Requested-With': 'XMLHttpRequest' // to suppress 401 browser popup
    });

    let options = new RequestOptions({
      headers: headers
    });

    var api = this.API_URL + 'listuser/';
    return this.http.get(api, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

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

  private extractData(res: Response) {
    let body = res.json();
    //console.log("Body :: " + body);
    return body || {};
  }
  /**
* Generic Error handle
* @param error The error to be handled
*/
  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}
