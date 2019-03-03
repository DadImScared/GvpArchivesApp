import { combineReducers } from "redux";

import itemsByCategory, { ItemsByCategoryState } from "./itemsByCategory";
import itemsById, { ItemsByIdState } from "./itemsById";
import loading, { ILoadingState } from "./loading";

export interface IReducerState {
  loading: ILoadingState;
  itemsByCategory: ItemsByCategoryState;
  itemsById: ItemsByIdState;
}

const reducer = combineReducers<IReducerState>({
  itemsByCategory,
  itemsById,
  loading,
});

export default reducer;
