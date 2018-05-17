import { Injectable } from '@angular/core';
//import {  Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse, /*HttpParams*/ } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { catchError } from 'rxjs/operators';
import { ConfigService } from '../utility/config.service';

@Injectable()
export class QuickbooksService {
  public API_URL: string = "";
  public token: string;

  constructor(
    public http: HttpClient,
    public storage: Storage,
    private configService: ConfigService,
  ) {
    this.API_URL = this.configService.getAPIURL();
  }

  updateProfilePicture(user_id, profile_picture) {

    var payLoad = {
      user_id: user_id,
      profile_picture: profile_picture
    };

    const token = this.getToken();

    const httpOptions = {
      headers: this.getHeaders()
    };

    const body = JSON.stringify(payLoad);

    var api = this.API_URL + `user/updatePicture?token=${token}`;
    return this.http.post(api, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
  * Get verifyOTP
  */
  verifyOTP( mobileNo, otp) {

    const token = this.getToken();
    let queryParams = {
      mobileNo: mobileNo,
      otp: otp
    }

    const httpOptions = {
      headers: this.getHeaders(),
      params: queryParams
    };

    var api = this.API_URL + `sms/verify?token=${token}`;
    return this.http.get(api, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  /**
 * Get sendSMS with OTP
 */
  sendSMS(userId, mobileNo) {

    const token = this.getToken();

    /*
    // Initialize Params Object
    let params = new HttpParams();

    // Begin assigning parameters
    params.append('userId', userId);
    params.append('mobileNo', mobileNo);
    */

    /*
    let queryParams = {
      userId: userId,
      mobileNo: mobileNo
    }

    const httpOptions = {
      headers: this.getHeaders(),
      params: queryParams
    };

    */

    var payLoad = {
      userId: userId,
      mobileNo: mobileNo
    };

    const httpOptions = {
      headers: this.getHeaders()
    };

    const body = JSON.stringify(payLoad);

    var api = this.API_URL + `sms/send?token=${token}`;
    return this.http.post(api, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );

      /*
    var api = this.API_URL + `sms/send?token=${token}`;
    return this.http.get(api, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
      */
  }

  /**
   * Get list of vehicles
   */
  getAmountPaidByUserId(userId) {

    const token = this.getToken();

    const httpOptions = {
      headers: this.getHeaders()
    };

    var api = this.API_URL + `transaction/${userId}` + '?token=' + token;
    return this.http.get(api, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  /**
   * Get list of vehicles
   */
  verifyTransaction(txnRef, userId) {

    const token = this.getToken();

    /*
    // Initialize Params Object
    let params = new HttpParams();

    // Begin assigning parameters
    params = params.append('userId', userId);
    params = params.append('txnRef', txnRef);
    */

    let queryParams = {
      userId: userId,
      txnRef: txnRef
    }

    const httpOptions = {
      headers: this.getHeaders(),
      params: queryParams
    };

    var api = this.API_URL + `transaction/verify?token=${token}`;
    return this.http.get(api, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Initiate transaction
   * @param userId 
   * @param email 
   * @param txnReference 
   * @param amount 
   */
  initiateTxn(userId, email, txnReference, amount) {

    var payLoad = {
      userId: userId,
      email: email,
      txnReference: txnReference,
      amount: amount
    };

    const token = this.getToken();

    const httpOptions = {
      headers: this.getHeaders()
    };

    const body = JSON.stringify(payLoad);

    var api = this.API_URL + 'transaction/initiateTxn' + '?token=' + token;
    return this.http.post(api, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  createVehicle(model_no, plate_no, color, date_purchased, driver_id) {

    var payLoad = {
      model_no: model_no,
      plate_no: plate_no,
      color: color,
      date_purchased: date_purchased,
      driver_id: driver_id
    };

    const token = this.getToken();

    const httpOptions = {
      headers: this.getHeaders()
    };

    const body = JSON.stringify(payLoad);

    var api = this.API_URL + 'vehicle' + '?token=' + token;
    return this.http.post(api, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get list of vehicles
   */
  getVehiclesList() {

    const token = this.getToken();

    const httpOptions = {
      headers: this.getHeaders()
    };

    var api = this.API_URL + 'vehicles' + '?token=' + token;
    return this.http.get(api, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getTxnById(txnId) {

    const token = this.getToken();

    const httpOptions = {
      headers: this.getHeaders()
    };

    var buildApi = this.API_URL + 'txn/getTxnById/' + txnId
    var api = buildApi + '?token=' + token;
    return this.http.get(api, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getTxnsList() {

    const token = this.getToken();

    const httpOptions = {
      headers: this.getHeaders()
    };

    var api = this.API_URL + 'txn/getAllTxn' + '?token=' + token;
    return this.http.get(api, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  newTxn(vehicleId, amount, txnType, date, narrative) {

    var payLoad = {
      vehicle_id: vehicleId,
      amount: amount,
      txn_type: txnType,
      date: date,
      narrative: narrative
    };

    const token = this.getToken();

    const httpOptions = {
      headers: this.getHeaders()
    };

    const body = JSON.stringify(payLoad);

    var api = this.API_URL + 'txn/newTxn' + '?token=' + token;
    return this.http.post(api, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getHeaders() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return headers;
  }

  /*
  private extractData(res: Response) {
    //let body = res.json();
    let body = res;
    return body || {};
  }
  */

  /**
* Generic Error handle
* @param error The error to be handled
*/
  /*
    private handleError(error: Response | any) {
      // In a real world app, we might use a remote logging infrastructure
      let errMsg: string;   
      if (error instanceof Response) {
        // Check error code
        if(error.status === 401 || error.status === 403 || error.status === 400){
          // handle authorization errors
          console.log("Error_Token_Expired or token not available:: redirect to login");
          //localStorage.removeItem("token");
          //this.events.publish('user:logout');
        }
        const body = error.json() || '';
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