import { createSelector } from "reselect";
import { ActionType } from "typesafe-actions";

import * as actions from "../actions";
import { ADD_ITEMS } from "../actiontypes/itemsById";
import { IReducerState } from "./index";

export interface Item {
  item_id: string;
  title: string;
  link: string;
  category: string;
  language?: string;
  year?: string;
  issue?: string;
  directory?: string;
}

export interface ItemsByIdState {
  [key: string]: Item;
}

function itemsById(state: ItemsByIdState = {}, action: ActionType<typeof actions.itemsById>) {
  switch (action.type) {
    case ADD_ITEMS:
      return {
        ...state,
        ...action.payload.items
      };
    default:
      return state;
  }
}

export const getItemsById = createSelector(
    [(state: IReducerState) => state.itemsById],
    (itemsState) => itemsState
);

export default itemsById;
