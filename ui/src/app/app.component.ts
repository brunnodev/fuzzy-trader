import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { RequestAssets } from './features/components/asset/store/actions/asset.actions';
import { AssetState } from './features/components/asset/store/reducers/asset.reducer';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {

  constructor(
    private assetStore: Store<AssetState>
  ) {
    const valueToInvest = undefined
    this.assetStore.dispatch(new RequestAssets({ valueToInvest }))
  }

}