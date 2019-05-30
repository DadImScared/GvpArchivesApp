import _ from "lodash";
import { combineReducers, DeepPartial } from "redux";

import audioPlayer, { getInitialAudioPlayerState, IAudioPlayerState } from "./audioPlayer";
import autoComplete, { getInitialAutoCompleteState, IAutoCompleteState } from "./autoComplete";
import itemsByCategory, { ItemsByCategoryState } from "./itemsByCategory";
import itemsById, { ItemsByIdState } from "./itemsById";
import loading, { ILoadingState } from "./loading";
import recentSearches, { RecentSearches } from "./recentSearches";
import search, { getInitialSearchState, ISearchState } from "./search";
import searchResults, { ISearchResults } from "./searchResults";

export interface IReducerState {
  audioPlayer: IAudioPlayerState;
  autoComplete: IAutoCompleteState;
  loading: ILoadingState;
  itemsByCategory: ItemsByCategoryState;
  itemsById: ItemsByIdState;
  recentSearches: RecentSearches;
  search: ISearchState;
  searchResults: ISearchResults;
}

export const getInitialReducerState = (injectedState: DeepPartial<IReducerState> = {}) => _.merge({
  audioPlayer: getInitialAudioPlayerState(),
  autoComplete: getInitialAutoCompleteState(),
  itemsByCategory: {},
  itemsById: {},
  loading: {},
  recentSearches: [],
  search: getInitialSearchState(),
  searchResults: {}
}, injectedState);

const reducer = combineReducers<IReducerState>({
  audioPlayer,
  autoComplete,
  itemsByCategory,
  itemsById,
  loading,
  recentSearches,
  search,
  searchResults
});

export default reducer;
