import { combineReducers } from "redux";

import audioPlayer, { IAudioPlayerState } from "./audioPlayer";
import itemsByCategory, { ItemsByCategoryState } from "./itemsByCategory";
import itemsById, { ItemsByIdState } from "./itemsById";
import loading, { ILoadingState } from "./loading";

export interface IReducerState {
  audioPlayer: IAudioPlayerState;
  loading: ILoadingState;
  itemsByCategory: ItemsByCategoryState;
  itemsById: ItemsByIdState;
}

const reducer = combineReducers<IReducerState>({
  audioPlayer,
  itemsByCategory,
  itemsById,
  loading,
});

export default reducer;
