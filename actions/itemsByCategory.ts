import axios from "axios";
import { normalize } from "normalizr";
import { Action, ActionCreator } from "redux";
import { batchActions } from "redux-batched-actions";
import { ThunkAction } from "redux-thunk";
import { action } from "typesafe-actions";
import { ADD_ITEMS_BY_CATEGORY, UPDATE_ITEMS_BY_CATEGORY } from "../actiontypes/itemsByCategory";
import { ITEMS_BY_CATEGORY } from "../loadingPrefix";
import { IReducerState } from "../reducers";
import { itemSchema } from "../schemas/items";
import { addItemsById, BASE_URL } from "./itemsById";
import { loadingEnd, loadingStart } from "./loading";

export type ActionCreatorThunk = ActionCreator<ThunkAction<void, IReducerState, undefined, Action<any>>>;

export const getItemsByCategory: ActionCreatorThunk = (category: string, nextPage?: string | boolean) => {
  return async (dispatch): Promise<void> => {
    const LOADING_ID = `${ITEMS_BY_CATEGORY}${category}`;
    dispatch(loadingStart(LOADING_ID));
    const firstPage = `${BASE_URL}/api/v1/items/${category}`;
    const url = typeof nextPage === "string" ? `${BASE_URL}${nextPage}` : firstPage;
    const response = await axios.get(url);
    if (response) {
      // dispatch batch actions
      const { data } = response;
      const { result: itemIds, entities: { items } } = normalize(data.results, itemSchema);
      dispatch(batchActions([
        addItemsById(items),
        (nextPage ? updateItemsByCategory : addItemsByCategory)({category, itemIds, nextPage: data.nextPage }),
        loadingEnd(LOADING_ID)
      ]));
    }
  };
};

interface ItemsByCategory {
  category: string;
  itemIds: string[];
  nextPage: boolean | string;
}

export const addItemsByCategory  = (data: ItemsByCategory) => {
  return action(ADD_ITEMS_BY_CATEGORY, data);
};

export const updateItemsByCategory = (data: ItemsByCategory) => {
  return action(UPDATE_ITEMS_BY_CATEGORY, data);
};

export interface ItemsByCategoryActions {
  addItemsByCategory: typeof addItemsByCategory;
  updateItemsByCategory: typeof updateItemsByCategory;
}

export default {
  addItemsByCategory,
  updateItemsByCategory
};
