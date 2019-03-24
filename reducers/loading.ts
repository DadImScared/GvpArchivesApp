import _ from "lodash";
import { createSelector } from "reselect";
import { ActionType } from "typesafe-actions";

import * as actions from "../actions";
import { LOADING_END, LOADING_START } from "../actiontypes/loading";
import { IReducerState } from "./index";

export interface ILoadingState {
  [key: string]: boolean;
}

function loading(state: ILoadingState = {}, action: ActionType<typeof actions.loading>) {
  switch (action.type) {
    case LOADING_START:
      return {
        [action.payload]: true
      };
    case LOADING_END:
      return {
        [action.payload]: false
      };
    default:
      return state;
  }
}

export const getLoading = (loadingPrefix: string, propsPath: string, defaultValue?: any) => {
  return createSelector<IReducerState, object, ILoadingState, string, boolean>(
      [
        (state) => state.loading,
        (_state, props) => _.get(props, propsPath, defaultValue)
      ],
      // Sometimes loading will be undefined so convert to boolean
      (loadingState, loadingId) => !!loadingState[`${loadingPrefix}${loadingId}`]
  );
};

export default loading;
