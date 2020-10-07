import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { AssetState } from 'app/features/components/asset/store/reducers/asset.reducer';
import { selectAssetList } from 'app/features/components/asset/store/selectors/asset.selectors';
import { SweetAlertService } from 'app/shared/services/sweet-alert.service';
import { of } from 'rxjs';
import { catchError, filter, first, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import swal from 'sweetalert2';

import { InvestmentService } from '../../services/investment.service';
import {
  ErrorRequestInvestments,
  ErrorRequestToCreateInvestment,
  InvestmentActionTypes,
  InvestmentCreated,
  InvestmentesLoaded,
  RequestInvestments,
  RequestToCreateInvestment,
  RequestInvestmentValueDialog,
} from '../actions/investment.actions';
import { RequestAssetsDialog } from 'app/features/components/asset/store/actions/asset.actions';

@Injectable()
export class InvestmentEffects {

  @Effect()
  requestInvestments$ = this.actions$.pipe(
    ofType<RequestInvestments>(InvestmentActionTypes.RequestInvestments),
    switchMap(() =>
      this.investmentService.load()
        .pipe(
          mergeMap(this.mapCurrentPrices.bind(this)),
          map(investments => new InvestmentesLoaded({ investments })),
          catchError(error => of(new ErrorRequestInvestments({ error })))
        )
    ))

  // improve this
  private mapCurrentPrices(investments) {
    return this.assetStore.pipe(
      select(selectAssetList),
      filter((assets: any) => !!assets && assets.length),
      first(),
      map(assets => this.mapInvestmentCurrentValue(assets, investments))
    )
  }

  private mapInvestmentCurrentValue(assets, investments) {
    const getAssetValue = investment =>
      assets.find(asset => asset.id === investment.assetId).value || 0

    return investments.map(investment => {
      return {
        ...investment,
        currentValue: getAssetValue(investment)
      }
    })
  }

  @Effect({ dispatch: false })
  errorRequestInvestments$ = this.actions$.pipe(
    ofType<ErrorRequestInvestments>(InvestmentActionTypes.ErrorRequestInvestments),
    map(action => action.payload.error),
    tap(error => this.sweetAlertService.errorSwal(error.message))
  )

  @Effect()
  requestToCreateInvestment$ = this.actions$.pipe(
    ofType<RequestToCreateInvestment>(InvestmentActionTypes.RequestToCreateInvestment),
    map(action => action.payload.investmentToCreate),
    switchMap(investmentToCreate =>
      this.investmentService.create(investmentToCreate)
        .pipe(
          map(this.mapCurrentValue.bind(this)),
          map(investmentCreated => new InvestmentCreated({ investmentCreated })),
          catchError(error => of(new ErrorRequestToCreateInvestment({ error })))
        )
    ))

  private mapCurrentValue(investmentCreated) {
    return {
      ...investmentCreated,
      currentValue: investmentCreated.purchaseValue
    }
  }

  @Effect({ dispatch: false })
  errorRequestToCreateInvestment$ = this.actions$.pipe(
    ofType<ErrorRequestToCreateInvestment>(InvestmentActionTypes.ErrorRequestToCreateInvestment),
    map(action => action.payload.error),
    tap(error => this.sweetAlertService.errorSwal(error.message))
  )

  @Effect({ dispatch: false })
  requestAssetsDialog$ = this.actions$.pipe(
    ofType<RequestInvestmentValueDialog>(InvestmentActionTypes.RequestInvestmentValueDialog),
    tap(() => this.openInvestmentValueDialog()),
  )

  private openInvestmentValueDialog() {
    swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true
    }).queue([
      {
        title: 'How much in usd do you want to invest?',
        text: 'Please use number in this format 150.50'
      }
    ]).then((result: any) => {
      const [ valueToInvest ] = result.value

      !valueToInvest || isNaN(valueToInvest)
        ? alert('The informed value is not a number. Try again.')
        : this.emitToLoadAssetsByValueInvestent(valueToInvest)
    })
  }

  private emitToLoadAssetsByValueInvestent(valueToInvest) {
    this.assetStore.dispatch(new RequestAssetsDialog({ valueToInvest }))
  }

  constructor(
    private actions$: Actions,
    private assetStore: Store<AssetState>,
    private investmentService: InvestmentService,
    private sweetAlertService: SweetAlertService,
  ) { }
}
