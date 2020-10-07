import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SessionService } from './services/session.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    SessionService
  ]
})
export class SessionModule { }
