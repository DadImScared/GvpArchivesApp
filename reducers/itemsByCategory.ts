import _ from "lodash";
import moment from "moment";
import { NavigationScreenProps } from "react-navigation";
import { createSelector } from "reselect";
import { ActionType } from "typesafe-actions";

import actions from "../actions";
import { ADD_ITEMS_BY_CATEGORY, UPDATE_ITEMS_BY_CATEGORY } from "../actiontypes/itemsByCategory";
import { ITEMS_BY_CATEGORY } from "../loadingPrefix";
import { IReducerState } from "./index";
import { getItemsById, Item } from "./itemsById";
import { getLoading } from "./loading";

interface ItemsByCategory {
  results: string[];
  nextPage?: boolean | string;
  timeToLive?: number;
}

export interface ItemsByCategoryData {
  results: Item[];
  isLoading: boolean;
  nextPage: boolean | string;
  timeToLive: number;
}

export interface ItemsByCategoryState {
  [key: string]: ItemsByCategory;
}

function itemsByCategory(
    state: ItemsByCategoryState = {},
    action: ActionType<typeof actions.itemsByCategory>
) {
  switch (action.type) {
    case ADD_ITEMS_BY_CATEGORY:
      return {
        ...state,
        [action.payload.category]: {
          nextPage: action.payload.nextPage,
          results: action.payload.itemIds,
          timeToLive: moment().add(1, "days").valueOf()
        }
      };
    case UPDATE_ITEMS_BY_CATEGORY:
      return {
        ...state,
        [action.payload.category]: {
          ...state[action.payload.category],
          nextPage: action.payload.nextPage,
          results: _.union(state[action.payload.category].results, action.payload.itemIds)
        }
      };
    default:
      return state;
  }
}

export const getItems = (state: IReducerState) => state.itemsByCategory;

export const getCategory = (_state: any, props: NavigationScreenProps) => props.navigation.getParam("category");

export const getItemsByCategoryState = createSelector(
    [getItems, getCategory],
    (items, category) => items[category] || {}
);

export const getItemsByCategory = () => {
  return createSelector(
      [
        getItemsByCategoryState,
        getItemsById,
        getLoading(ITEMS_BY_CATEGORY, "navigation.state.params.category")
      ],
      ({ results = [], nextPage = false, timeToLive = 0 }, items, isLoading): ItemsByCategoryData => ({
        isLoading,
        nextPage,
        timeToLive,
        results: results.map((itemId) => items[itemId])
      })
  );
};

export default itemsByCategory;
