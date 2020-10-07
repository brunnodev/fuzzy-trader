import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InvestmentTopCardsComponent } from './investment-top-cards.component';

@NgModule({
  declarations: [
    InvestmentTopCardsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InvestmentTopCardsComponent
  ]
})
export class InvestmentTopCardsModule { }
