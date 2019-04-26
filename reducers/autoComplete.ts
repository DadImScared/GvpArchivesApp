import moment from "moment";
import { createSelector } from "reselect";
import { ActionType } from "typesafe-actions";

import autoComplete from "../actions/autoComplete";
import * as ActionTypes from "../actiontypes/autoComplete";
import { AUTOCOMPLETE_QUERY } from "../loadingPrefix";
import { IReducerState } from "./index";
import { ILoadingState } from "./loading";
import { getQueryId, getSearch, ISearchState } from "./search";

export interface IAutoCompleteState {
  [key: string]: {
    results: string[];
    timeToLive: number;
  };
}

export const getInitialAutoCompleteState = () => ({});

export default function(state = getInitialAutoCompleteState(), action: ActionType<typeof autoComplete>) {
  switch (action.type) {
    case ActionTypes.ADD_AUTOCOMPLETE:
      const { payload: { query, categories, results } } = action;
      return {
        ...state,
        [getQueryId(query, categories)]: {
          results,
          timeToLive: moment().add(1, "days").valueOf()
        }
      };
    default:
      return state;
  }
}

interface IGetAutoCompleteReturn {
  results: string[];
  timeToLive: number;
}

export interface IAutoCompleteScreenData {
  autoComplete: IGetAutoCompleteReturn;
  query: string;
  queryId: string;
  categories: string[];
  isLoading: boolean;
}

export const getAutoCompleteScreen = createSelector<
  IReducerState,
  IAutoCompleteState,
  ISearchState,
  ILoadingState,
  IAutoCompleteScreenData
>(
  [(state) => state.autoComplete, getSearch, (state) => state.loading],
  (autoCompleteState, { categories, query }, loadingState) => {
    const queryId = getQueryId(query, categories);
    return {
      categories,
      query,
      queryId,
      autoComplete: autoCompleteState[queryId] || { results: [], timeToLive: 0 },
      isLoading: loadingState[`${AUTOCOMPLETE_QUERY}${queryId}`]
    };
  }
);
