import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { InvestmentTopCardsModule } from './components/investment-top-cards/investment-top-cards.module';
import { ListComponent } from './components/list/list.component';
import { InvestmentRoutingModule } from './investment-routing.module';
import { InvestmentService } from './services/investment.service';
import { InvestmentEffects } from './store/effects/investment.effects';
import * as fromInvestment from './store/reducers/investment.reducer';

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    InvestmentRoutingModule,
    InvestmentTopCardsModule,

    /* Store */
    StoreModule.forFeature('investment', fromInvestment.reducer),
    EffectsModule.forFeature([ InvestmentEffects ])
  ],
  providers: [
    InvestmentService
  ]
})
export class InvestmentModule { }
