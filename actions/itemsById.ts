import { action } from "typesafe-actions";
import { ADD_ITEMS } from "../actiontypes/itemsById";
import { Item } from "../reducers/itemsById";

export const BASE_URL = "https://api.gvparchives.com";

export const addItemsById = (items: { [key: string]: Item }) => action(ADD_ITEMS, { items });

export interface ItemsByIdActions {
  addItemsById: typeof addItemsById;
}

export default {
  addItemsById
};
