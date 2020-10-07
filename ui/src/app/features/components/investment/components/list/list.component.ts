import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { RequestInvestments, RequestInvestmentValueDialog } from '../../store/actions/investment.actions';
import { InvestmentState } from '../../store/reducers/investment.reducer';
import { selectInvestmentList } from '../../store/selectors/investment.selectors';
import { AssetState } from 'app/features/components/asset/store/reducers/asset.reducer';
import { RequestAssets } from 'app/features/components/asset/store/actions/asset.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

  investments$ = this.investmentStore.pipe(
    select(selectInvestmentList)
  )

  constructor(
    private assetStore: Store<AssetState>,
    private investmentStore: Store<InvestmentState>
  ) { }

  isPositiveValue(investment) {
    return investment.currentValue > investment.purchaseValue
  }

  refreshList() {
    this.investmentStore.dispatch(new RequestInvestments())
  }

  openInvestmentValue() {
    this.investmentStore.dispatch(new RequestInvestmentValueDialog())
  }

  ngOnInit() {
    this.initLists()
  }

  initLists() {
    const valueToInvest = undefined
    this.assetStore.dispatch(new RequestAssets({ valueToInvest }))
    this.investmentStore.dispatch(new RequestInvestments())
  }

}
