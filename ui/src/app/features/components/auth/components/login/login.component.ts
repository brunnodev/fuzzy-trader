import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { RequestLogin } from '../../store/actions/auth.actions';
import { AuthState } from '../../store/reducers/auth.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authStore: Store<AuthState>
  ) { }

  login(formValue) {
    if (this.loginForm.valid) {
      this.authStore.dispatch(new RequestLogin({
        email: formValue.email,
        password: formValue.password
      }))
    }
  }

  navigateToSignup() {
    this.router.navigate(['/auth/signup'])
  }
}
