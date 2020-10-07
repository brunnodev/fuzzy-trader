import { AssetActions, AssetActionTypes } from "../actions/asset.actions"
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface AssetState extends EntityState<any> {
  loading: boolean,
  suggestions: []
}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>()

export const initialState: AssetState = adapter.getInitialState({
  loading: false,
  suggestions: []
})

export function reducer(state = initialState, action: AssetActions): AssetState {
  switch (action.type) {
    case AssetActionTypes.RequestAssets:
      return adapter.removeAll({ ...state, loading: true })

    case AssetActionTypes.AssetsLoaded:
      return adapter.addAll(action.payload.assetsConfig.assets, {
        ...state,
        suggestions: action.payload.assetsConfig.suggestions,
        loading: false
      })

    case AssetActionTypes.ErrorRequestAssets:
      return { ...state, loading: false }

    default:
      return state
  }
}

export const {
  selectAll,
} = adapter.getSelectors()