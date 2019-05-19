import _ from "lodash";
import { ActionType } from "typesafe-actions";

import { search } from "../actions";
import * as ActionTypes from "../actiontypes/search";
import { IReducerState } from "./index";

export interface ISearchState {
  categories: string[];
  query: string;
}

export type SearchStateAndActions<
  T extends keyof ISearchState | keyof typeof search
  > = Pick<ISearchState & typeof search, T>;

export const CATEGORIES = [
  "bhagavatpatrika",
  "book",
  "harikatha",
  "harmonistmagazine",
  "harmonistmonthly",
  "lecture",
  "movie",
  "song"
];

export const getInitialSearchState = (): ISearchState => ({
  categories: CATEGORIES,
  query: ""
});

export default function(state = getInitialSearchState(), action: ActionType<typeof search>) {
  switch (action.type) {
    case ActionTypes.UPDATE_SEARCH_QUERY:
      return {
        ...state,
        query: action.payload
      };
    case ActionTypes.TOGGLE_CATEGORIES:
      const { payload } = action;
      const { categories } = state;
      return {
        ...state,
        categories: categories.includes(payload) ?
          categories.filter((category) => category !== action.payload)
          :
          [...categories, payload]
      };
    case ActionTypes.SELECT_ALL_CATEGORIES:
      return {
        ...state,
        categories: [...CATEGORIES]
      };
    case ActionTypes.REMOVE_ALL_CATEGORIES:
      return {
        ...state,
        categories: []
      };
    default:
      return state;
  }
}

export const getQueryId = (query: string, categories: string[]) => {
  return `${query}-${_.sortBy(categories, (o) => o).join(",")}`;
};

export const getSearch = (state: IReducerState) => state.search;
