import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AssetModule } from './components/asset/asset.module';
import { AuthModule } from './components/auth/auth.module';
import { FeaturesRoutingModule } from './features-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    AuthModule,
    AssetModule
  ]
})
export class FeaturesModule { }
