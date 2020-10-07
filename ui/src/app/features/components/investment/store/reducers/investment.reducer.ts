import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { InvestmentActions, InvestmentActionTypes } from '../actions/investment.actions';

export interface InvestmentState extends EntityState<any> {
  loading: boolean,
  totals: {
    invested: number,
    updated: number
  }
}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>()

export const initialState: InvestmentState = adapter.getInitialState({
  loading: false,
  totals: {
    invested: 0,
    updated: 0
  }
})

export function reducer(state = initialState, action: InvestmentActions): InvestmentState {
  switch (action.type) {

    case InvestmentActionTypes.RequestInvestments:
      return adapter.removeAll({ ...initialState, loading: true })

    case InvestmentActionTypes.InvestmentesLoaded: {
      const investments = action.payload.investments

      return adapter.addAll(investments, {
        ...state,
        totals: {
          invested: getTotalInvested(investments),
          updated: getTotalUpdated(investments)
        },
        loading: false
      })
    }

    case InvestmentActionTypes.ErrorRequestInvestments:
      return { ...state, loading: false }

    case InvestmentActionTypes.RequestToCreateInvestment:
      return { ...state, loading: true }

    case InvestmentActionTypes.InvestmentCreated: {
      const investment = action.payload.investmentCreated

      return adapter.addOne(investment, {
        ...state,
        totals: {
          invested: (
            state.totals.invested + (investment.amount * investment.purchaseValue)
          ),
          updated: (
            state.totals.updated + (investment.amount * investment.purchaseValue)
          )
        },
        loading: false
      })
    }

    case InvestmentActionTypes.ErrorRequestToCreateInvestment:
      return { ...state, loading: false }

    default:
      return state
  }
}

const getTotalInvested = investments => {
  const sumValues = (total, investment) => {
    return (investment.amount * investment.purchaseValue) + total
  }

  return investments.reduce(sumValues, 0)
}

const getTotalUpdated = investments => {
  const sumValues = (total, investment) => {
    return (investment.amount * investment.currentValue) + total
  }

  return investments.reduce(sumValues, 0)
}

export const {
  selectAll,
} = adapter.getSelectors()