import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SweetAlertService } from 'app/shared/services/sweet-alert.service';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { AssetsDialogComponent } from '../../components/assets-dialog/assets-dialog.component';
import { AssetService } from '../../services/asset.service';
import {
  AssetActionTypes,
  AssetsLoaded,
  ErrorRequestAssets,
  RequestAssets,
  RequestAssetsDialog,
} from '../actions/asset.actions';

@Injectable()
export class AssetEffects {

  @Effect()
  requestAssets$ = this.actions$.pipe(
    ofType<RequestAssets>(AssetActionTypes.RequestAssets),
    map(action => action.payload.valueToInvest),
    switchMap(valueToInvest =>
      this.assetService.load(valueToInvest)
        .pipe(
          map(assetsConfig => new AssetsLoaded({ assetsConfig })),
          catchError(error => of(new ErrorRequestAssets({ error })))
        )
    ))

  @Effect({ dispatch: false })
  errorRequestAssets$ = this.actions$.pipe(
    ofType<ErrorRequestAssets>(AssetActionTypes.ErrorRequestAssets),
    map(action => action.payload.error),
    tap(error => this.sweetAlertService.errorSwal(error.message))
  )

  @Effect()
  requestAssetsDialog$ = this.actions$.pipe(
    ofType<RequestAssetsDialog>(AssetActionTypes.RequestAssetsDialog),
    map(action => action.payload.valueToInvest),
    tap(valueToInvest => this.dialogService.open(AssetsDialogComponent, {data: valueToInvest, width: '60%', height: '90%' })),
    map(valueToInvest => new RequestAssets({ valueToInvest }))
  )

  constructor(
    private actions$: Actions,
    private assetService: AssetService,
    private sweetAlertService: SweetAlertService,
    private dialogService: MatDialog
  ) { }
}
