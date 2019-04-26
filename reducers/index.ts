import _ from "lodash";
import { combineReducers, DeepPartial } from "redux";

import audioPlayer, { getInitialAudioPlayerState, IAudioPlayerState } from "./audioPlayer";
import autoComplete, { getInitialAutoCompleteState, IAutoCompleteState } from "./autoComplete";
import itemsByCategory, { ItemsByCategoryState } from "./itemsByCategory";
import itemsById, { ItemsByIdState } from "./itemsById";
import loading, { ILoadingState } from "./loading";
import search, { getInitialSearchState, ISearchState } from "./search";

export interface IReducerState {
  audioPlayer: IAudioPlayerState;
  autoComplete: IAutoCompleteState;
  loading: ILoadingState;
  itemsByCategory: ItemsByCategoryState;
  itemsById: ItemsByIdState;
  search: ISearchState;
}

export const getInitialReducerState = (injectedState: DeepPartial<IReducerState> = {}) => _.merge({
  audioPlayer: getInitialAudioPlayerState(),
  autoComplete: getInitialAutoCompleteState(),
  itemsByCategory: {},
  itemsById: {},
  loading: {},
  search: getInitialSearchState()
}, injectedState);

const reducer = combineReducers<IReducerState>({
  audioPlayer,
  autoComplete,
  itemsByCategory,
  itemsById,
  loading,
  search
});

export default reducer;
