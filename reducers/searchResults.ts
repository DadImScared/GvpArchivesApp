import moment from "moment";
import { ActionType } from "typesafe-actions";

import { NavigationScreenProps } from "react-navigation";
import { createSelector } from "reselect";
import { searchResults } from "../actions";
import { INormalizedSearchResults, ISearchItem } from "../actions/searchResults";
import * as ActionTypes from "../actiontypes/searchResults";
import { SEARCH_RESULTS } from "../loadingPrefix";
import { IReducerState } from "./index";
import { ItemsByIdState } from "./itemsById";

export interface ISearchResult {
  results: INormalizedSearchResults[];
  timeToLive: number;
  suggestions: string[];
  nextPage: string | boolean;
}

export interface ISearchResults {
  [key: string]: ISearchResult;
}

export default function(state: ISearchResults = {}, action: ActionType<typeof searchResults>) {
  switch (action.type) {
    case ActionTypes.ADD_SEARCH:
      const { payload: { queryId, ...other } } = action;
      return {
        ...state,
        [queryId]: {
          ...other,
          timeToLive: moment().add(1, "days").valueOf()
        }
      };
    case ActionTypes.UPDATE_SEARCH:
      const { payload } = action;
      return {
        ...state,
        [payload.queryId]: {
          ...state[payload.queryId],
          nextPage: payload.nextPage,
          results: [...state[payload.queryId].results, ...payload.results]
        }
      };
    default:
      return state;
  }
}

const defaultSearchResult: ISearchResult = {
  nextPage: false,
  results: [],
  suggestions: [],
  timeToLive: 0,
};

export interface ISearchResultData {
  results: ISearchItem[];
  suggestions: string[];
  timeToLive: number;
  isLoading: boolean;
}

export const selectSearchResults = createSelector<
  IReducerState,
  NavigationScreenProps,
  ISearchResult,
  boolean,
  ItemsByIdState,
  ISearchResultData
  >(
  [
    (state, props) => state.searchResults[props.navigation.getParam("queryId")] || defaultSearchResult,
    (state, props) => state.loading[`${SEARCH_RESULTS}${props.navigation.getParam("queryId")}`],
    (state) => state.itemsById
  ],
  (searchResult, isLoading, itemsById) => {
    return {
      isLoading: isLoading === undefined ? true : isLoading,
      results: searchResult.results.map((item) => ({
        ...itemsById[item.item_id],
        ...item
      })),
      suggestions: searchResult.suggestions,
      timeToLive: searchResult.timeToLive,
    };
  }
);

export const makeSelectSearchResults = () => createSelector<
  IReducerState,
  NavigationScreenProps,
  ISearchResult,
  boolean,
  ItemsByIdState,
  ISearchResultData
  >(
  [
    (state, props) => state.searchResults[props.navigation.getParam("queryId")] || defaultSearchResult,
    (state, props) => state.loading[`${SEARCH_RESULTS}${props.navigation.getParam("queryId")}`],
    (state) => state.itemsById
  ],
  (searchResult, isLoading, itemsById) => {
    return {
      isLoading: isLoading === undefined ? true : isLoading,
      results: searchResult.results.map((item) => ({
        ...itemsById[item.item_id],
        ...item
      })),
      suggestions: searchResult.suggestions,
      timeToLive: searchResult.timeToLive,
    };
  }
);
