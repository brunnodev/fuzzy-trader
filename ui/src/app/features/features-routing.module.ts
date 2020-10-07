import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'assets',
        loadChildren: './components/asset/asset.module#AssetModule'
      },
      {
        path: 'investments',
        loadChildren: './components/investment/investment.module#InvestmentModule'
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: './components/auth/auth.module#AuthModule'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
