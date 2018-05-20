import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QuickbooksService } from '../../providers/quickbooks.service';
 
@Injectable()
export class UsernameValidator {
 
  debouncer: any;
 
  constructor(public quickbooksService: QuickbooksService){
 
  }
 
  checkUsername(control: FormControl): any {
 
    clearTimeout(this.debouncer);
 
    return new Promise(resolve => {
 
        /*
      this.debouncer = setTimeout(() => {
 
        this.quickbooksService.validateUsername(control.value).subscribe((res) => {
          if(res.ok){
            resolve(null);
          }
        }, (err) => {
          resolve({'usernameInUse': true});
        });
 
      }, 1000);     
      */

      /*
     this.debouncer = setTimeout(() => {
 
        this.quickbooksService.validateUsername(control.value).subscribe((res) => {
          if(res.ok){
            resolve(null);
          }
        }, (err) => {
          resolve({'usernameInUse': true});
        });
 
      }, 1000);  
      
      */

     setTimeout(() => {
        if(control.value.toLowerCase() === "greg"){
 
          resolve({
            "username taken": true
          });
 
        } else {
          resolve(null);
        }
      }, 2000);
 
    });
  }
 
}