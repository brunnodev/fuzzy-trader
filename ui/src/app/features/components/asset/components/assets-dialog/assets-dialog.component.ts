import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { RequestToCreateInvestment } from 'app/features/components/investment/store/actions/investment.actions';
import { InvestmentState } from 'app/features/components/investment/store/reducers/investment.reducer';

import { AssetState } from '../../store/reducers/asset.reducer';
import { selectSuggestedAssetList } from '../../store/selectors/asset.selectors';

@Component({
  selector: 'app-assets-dialog',
  templateUrl: './assets-dialog.component.html',
  styleUrls: ['./assets-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetsDialogComponent {

  suggestedAssets$ = this.assetStore.pipe(
    select(selectSuggestedAssetList)
  )

  constructor(
    @Inject(MAT_DIALOG_DATA) public valueToInvest,
    private assetStore: Store<AssetState>,
    private investmentStore: Store<InvestmentState>,
    private dialogRef: MatDialogRef<AssetsDialogComponent>
  ) { }

  addInverstment(asset) {
    const investmentToCreate = {
      assetId: asset.id,
      amount: (this.valueToInvest / asset.value),
      purchaseValue: asset.value
    }

    this.dialogRef.close()

    this.investmentStore.dispatch(new RequestToCreateInvestment({ investmentToCreate }))
  }
}
