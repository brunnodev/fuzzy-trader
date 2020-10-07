import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RequestAssetsDialog } from 'app/features/components/asset/store/actions/asset.actions';
import { AssetState } from 'app/features/components/asset/store/reducers/asset.reducer';

import { RequestInvestments } from '../../store/actions/investment.actions';
import { InvestmentState } from '../../store/reducers/investment.reducer';
import { selectInvestmentList } from '../../store/selectors/investment.selectors';

import swal from 'sweetalert2';

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
    swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1']
    }).queue([
      {
        title: 'How much in usd do you want to invest?',
        text: 'Please use number in this format 150.50'
      }
    ]).then((result: any) => {
      const [ valueToInvest ] = result.value
      this.assetStore.dispatch(new RequestAssetsDialog({ valueToInvest }))
    })
  }

  ngOnInit() {
    this.investmentStore.dispatch(new RequestInvestments())
  }

}
