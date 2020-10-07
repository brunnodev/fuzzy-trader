import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';

import { AssetState } from '../../store/reducers/asset.reducer';
import { selectAssetList } from '../../store/selectors/asset.selectors';

@Component({
  selector: 'app-assets-dialog',
  templateUrl: './assets-dialog.component.html',
  styleUrls: ['./assets-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetsDialogComponent {

  assets$ = this.assetStore.pipe(
    select(selectAssetList)
  )

  constructor(
    @Inject(MAT_DIALOG_DATA) public valueToInvest,
    private assetStore: Store<AssetState>,
    private dialogRef: MatDialogRef<AssetsDialogComponent>
  ) { }

  addInverstment(asset) {
    const investmentToCreate = {
      assetId: asset.id,
      amount: (this.valueToInvest / asset.value),
      purchaseValue: asset.value
    }

    this.dialogRef.close()
  }
}
