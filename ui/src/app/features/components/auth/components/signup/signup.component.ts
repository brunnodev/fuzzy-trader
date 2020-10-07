import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthState } from '../../store/reducers/auth.reducer';
import { Store } from '@ngrx/store';
import { RequestSignup } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent {

  signupForm = this.fb.group({
    name: ['', [ Validators.required ]],
    email: ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required ]]
  })

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authStore: Store<AuthState>
  ) { }

  signup(signupData) {
    if (this.signupForm.valid) {
      this.authStore.dispatch(new RequestSignup({ signupData }))
    }
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login'])
  }
}
