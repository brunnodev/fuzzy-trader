import { Action } from '@ngrx/store';

export enum AssetActionTypes {
  RequestAssets = '[Asset List Component] Request Assets',
  AssetsLoaded = '[Asset API] Assets Loaded',
  ErrorRequestAssets = '[Asset API] Error Request Assets',

  RequestAssetsDialog = '[Investment Component] Request Assets Dialog'
}

export class RequestAssets implements Action {
  readonly type = AssetActionTypes.RequestAssets;
}

export class AssetsLoaded implements Action {
  readonly type = AssetActionTypes.AssetsLoaded;

  constructor(public payload: { assets: any }) { }
}

export class ErrorRequestAssets implements Action {
  readonly type = AssetActionTypes.ErrorRequestAssets;

  constructor(public payload: { error: any }) { }
}

export class RequestAssetsDialog implements Action {
  readonly type = AssetActionTypes.RequestAssetsDialog;

  constructor(public payload: { valueToInvest: any }) { }
}

export type AssetActions =
  RequestAssets
  | AssetsLoaded
  | ErrorRequestAssets
  | RequestAssetsDialog