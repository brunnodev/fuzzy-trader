import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AssetsDialogModule } from './components/assets-dialog/assets-dialog.module';
import { AssetService } from './services/asset.service';
import { AssetEffects } from './store/effects/asset.effects';
import * as fromAsset from './store/reducers/asset.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AssetsDialogModule,

    /* Store */
    StoreModule.forFeature('asset', fromAsset.reducer),
    EffectsModule.forFeature([ AssetEffects ])
  ],
  providers: [
    AssetService
  ]
})
export class AssetModule { }
