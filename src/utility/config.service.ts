import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

    _apiURI: string;
    API_KEY: string;
    API_URL: string;
    payStackAPI: string;
    payStackSecretKey: string;
    payStackPublicKey: string;
    ONE_SIGNAL_APPID: string;
    GOOGLE_PROJECT_ID: string;

    constructor() {
        this.API_KEY = "1234";
        // this.API_URL = "http://localhost:8000/api/";
        //  this.API_URL = "http://10.0.2.2:8000/api/";
        // this.API_URL = "http://192.168.100:8000/api/";
        this.API_URL = "https://quickbooksbackend.tunbor.com/api/";
        this.payStackAPI = "https://api.paystack.co/";
        this.payStackPublicKey = "pk_test_abcd9d53c2457dc94e59d41e131439006dc7fa7c";
        this.ONE_SIGNAL_APPID = "923f0eae-ee5f-4c1f-b752-1b7fe641ff2e";
        this.GOOGLE_PROJECT_ID = "533923152117";
    }

    getApiURI() {
        return this._apiURI;
    }

    getApiHost() {
        return this._apiURI.replace('api/', '');
    }

    getAPIKEY() {
        return this.API_KEY;
    }

    getAPIURL() {
        return this.API_URL;
    }

    getPayStackAPI() {
        return this.payStackAPI;
    }

    getPayStackSecretKey() {
        return this.payStackSecretKey;
    }

    getPayStackPublicKey() {
        return this.payStackPublicKey;
    }

    getOneSignalAppId() {
        return this.ONE_SIGNAL_APPID;
    }

    getGoogleProjectId() {
        return this.GOOGLE_PROJECT_ID;
    }

}