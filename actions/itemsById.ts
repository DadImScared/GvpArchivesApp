import { action } from "typesafe-actions";
import { ADD_ITEMS } from "../actiontypes/itemsById";
import { Item } from "../reducers/itemsById";

export const BASE_URL = __DEV__ ? "http://192.168.0.4:3000/api/v1" : "https://api.gvparchives.com/api/v1";

export const addItemsById = (items: { [key: string]: Item }) => action(ADD_ITEMS, { items });

export interface ItemsByIdActions {
  addItemsById: typeof addItemsById;
}

export default {
  addItemsById
};
