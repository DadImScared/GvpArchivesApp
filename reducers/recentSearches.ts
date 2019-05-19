import moment from "moment";
import { ActionType } from "typesafe-actions";

import { recentSearches } from "../actions";
import { ADD_SEARCH } from "../actiontypes/recentSearches";

export interface IRecentSearch {
  query: string;
  categories: string[];
  timestamp: number;
}

export type RecentSearches = IRecentSearch[];

export default function(state: RecentSearches = [], action: ActionType<typeof recentSearches>) {
  switch (action.type) {
    case ADD_SEARCH:
      const { payload } = action;
      return [
        {
          categories: payload.categories,
          query: payload.query,
          timestamp: moment().valueOf()
        },
        ...state
      ];
    default:
      return state;
  }
}
