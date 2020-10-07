import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  successSwal(text = '', title = 'Good job!') {
    swal.fire(title, text, 'success')
  }

  errorSwal(text = '', title = 'Oops...') {
    swal.fire(title, text, 'error')
  }
}
