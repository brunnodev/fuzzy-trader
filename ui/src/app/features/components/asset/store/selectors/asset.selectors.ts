import { createSelector } from '@ngrx/store';

import { selectAll } from '../reducers/asset.reducer';

export const selectAssetState = state => state.asset

export const isLoading = createSelector(
  selectAssetState,
  asset => asset.loading
)

export const selectAssetList = createSelector(
  selectAssetState,
  selectAll
)

export const selectSuggestedAssetList = createSelector(
  selectAssetState,
  state => state.suggestions
)