import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';
//import { Events } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { ConfigService } from '../utility/config.service';

@Injectable()
export class QuickbooksService {
  public API_URL: string = "";
  public token: string;

  constructor(
    /*
    public http: Http, 
    */
    public http: HttpClient,
    public storage: Storage, 
    private configService: ConfigService,
    //public events: Events
  ) {
    this.API_URL = configService.getAPIURL();
  }


  /**
   * Get list of vehicles
   */
  verifyTransaction(transactionRef, userId) {

    const token = this.getToken();
    
    const httpOptions = this.getHeaders();

    //var api = this.API_URL + 'vehicles' + '?token=' + token;
    var api = this.API_URL + `transaction/verify/${transactionRef}/${userId}` + '?token=' + token;
    return this.http.get(api, httpOptions)
      .map(this.extractData)
      .catch(this.handleError);
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
    
    const httpOptions = this.getHeaders();

    const body = JSON.stringify(payLoad);

    var api = this.API_URL + 'transaction/initiateTxn' + '?token=' + token;
    return this.http.post(api, body, httpOptions)
      .map(this.extractData)
      .catch(this.handleError);
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
    
    const httpOptions = this.getHeaders();

    const body = JSON.stringify(payLoad);

    var api = this.API_URL + 'vehicle' + '?token=' + token;
    return this.http.post(api, body, httpOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Get list of vehicles
   */
  getVehiclesList() {

    const token = this.getToken();
    
    const httpOptions = this.getHeaders();

    var api = this.API_URL + 'vehicles' + '?token=' + token;
    return this.http.get(api, httpOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getTxnById(txnId) {

    const token = this.getToken();
    
    const httpOptions = this.getHeaders();

    // var api = this.API_URL + 'txn/getTxnById' + '?token=' + token;
    var buildApi = this.API_URL + 'txn/getTxnById/' + txnId
    var api = buildApi + '?token=' + token;
    return this.http.get(api, httpOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getTxnsList() {

    const token = this.getToken();
    
    const httpOptions = this.getHeaders();

    var api = this.API_URL + 'txn/getAllTxn' + '?token=' + token;
    return this.http.get(api, httpOptions)
      .map(this.extractData)
      .catch(this.handleError);
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
    
    const httpOptions = this.getHeaders();

    const body = JSON.stringify(payLoad);

    var api = this.API_URL + 'txn/newTxn' + '?token=' + token;
    return this.http.post(api, body, httpOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getHeaders() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return httpOptions;
  }

  private extractData(res: Response) {
    //let body = res.json();
    let body = res;   
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

}