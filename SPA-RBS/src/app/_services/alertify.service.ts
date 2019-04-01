import { Injectable } from '@angular/core';

declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  confirm(message: string, okaCallback: () => any) {
    alertify.confirm(message, function(e) {
      // e represents when user is clicking okay button
      if (e) {
        okaCallback();
        // We don't need to do anything if the user clicked cancel button
      } else { }
    });
  }

  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }

  message(message: string) {
    alertify.message(message);
  }

}
