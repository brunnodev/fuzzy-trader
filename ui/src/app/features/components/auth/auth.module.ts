import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './services/auth.service';
import { AuthEffects } from './store/effects/auth.effects';
import * as fromAuth from './store/reducers/auth.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,

    /* Store */
    StoreModule.forFeature('auth', fromAuth.reducer),
    EffectsModule.forFeature([ AuthEffects ])
  ],
  providers: [
  ]
})
export class AuthModule { }
