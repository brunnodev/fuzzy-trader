import { createSelector } from '@ngrx/store';

import { selectAll } from '../reducers/investment.reducer';

export const selectInvestState = state => state.investment

export const isLoading = createSelector(
  selectInvestState,
  investment => investment.loading
)

export const selectTotals = createSelector(
  selectInvestState,
  investment => investment.totals
)


export const selectInvestmentList = createSelector(
  selectInvestState,
  selectAll
)