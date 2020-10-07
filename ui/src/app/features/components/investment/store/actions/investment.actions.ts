import { Action } from '@ngrx/store';

export enum InvestmentActionTypes {
  RequestInvestments = '[Investment List Component] Request Investments',
  InvestmentesLoaded = '[Investment API] Investmentes Loaded',
  ErrorRequestInvestments = '[Investment API] Error Request Investments',

  RequestToCreateInvestment = '[Assets Dialog Component] Request To Create Investment',
  InvestmentCreated = '[Investment API] Investment Created',
  ErrorRequestToCreateInvestment = '[Investment API] Error Request To Create Investment',

  RequestInvestmentValueDialog = '[Investment List Component] Request Investment Value Dialog',
}

export class RequestInvestments implements Action {
  readonly type = InvestmentActionTypes.RequestInvestments;
}

export class InvestmentesLoaded implements Action {
  readonly type = InvestmentActionTypes.InvestmentesLoaded;

  constructor(public payload: { investments: any }) { }
}

export class ErrorRequestInvestments implements Action {
  readonly type = InvestmentActionTypes.ErrorRequestInvestments;

  constructor(public payload: { error: any }) { }
}

export class RequestToCreateInvestment implements Action {
  readonly type = InvestmentActionTypes.RequestToCreateInvestment;

  constructor(public payload: { investmentToCreate: any }) { }
}

export class InvestmentCreated implements Action {
  readonly type = InvestmentActionTypes.InvestmentCreated;

  constructor(public payload: { investmentCreated: any }) { }
}

export class ErrorRequestToCreateInvestment implements Action {
  readonly type = InvestmentActionTypes.ErrorRequestToCreateInvestment;

  constructor(public payload: { error: any }) { }
}

export class RequestInvestmentValueDialog implements Action {
  readonly type = InvestmentActionTypes.RequestInvestmentValueDialog;
}

export type InvestmentActions =
  RequestInvestments
  | InvestmentesLoaded
  | ErrorRequestInvestments
  | RequestToCreateInvestment
  | InvestmentCreated
  | ErrorRequestToCreateInvestment
  | RequestInvestmentValueDialog