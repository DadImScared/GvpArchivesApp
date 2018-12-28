import { action } from "typesafe-actions";

import { LOADING_END, LOADING_START } from "../actiontypes/loading";

export const loadingStart = (id: string) => action(LOADING_START, id);

export const loadingEnd = (id: string) => action(LOADING_END, id);

export interface ILoadingActions {
  loadingStart: typeof loadingStart;
  loadingEnd: typeof loadingEnd;
}

export default {
  loadingEnd,
  loadingStart
};
