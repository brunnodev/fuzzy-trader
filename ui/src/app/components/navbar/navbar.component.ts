import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { RequestLogout } from 'app/features/components/auth/store/actions/auth.actions';
import { AuthState } from 'app/features/components/auth/store/reducers/auth.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {

  constructor(
    private authStore: Store<AuthState>
  ) { }

  logout() {
    this.authStore.dispatch(new RequestLogout())
  }
}
