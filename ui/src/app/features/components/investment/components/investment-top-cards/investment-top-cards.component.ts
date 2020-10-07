import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { InvestmentState } from 'app/features/components/investment/store/reducers/investment.reducer';
import { selectTotals } from 'app/features/components/investment/store/selectors/investment.selectors';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-investment-top-cards',
  templateUrl: './investment-top-cards.component.html',
  styleUrls: ['./investment-top-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestmentTopCardsComponent {

  totals$ = this.investmentStore.pipe(
    select(selectTotals),
    tap(console.log)
  )

  constructor(
    private investmentStore: Store<InvestmentState>
  ) { }

}
