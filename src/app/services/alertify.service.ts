import { Injectable } from '@angular/core';
declare let alertify: any;
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  constructor() {}

  confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, function(e) {
      if (e) {
        okCallback();
      } else {}
    });
  }
  Confirm(message: string, type: string, okCallback: () => any) {
  
      Swal.fire({
        text: message,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: type
      }).then((result) => {
        if (result.value) {
          okCallback();
        }
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
