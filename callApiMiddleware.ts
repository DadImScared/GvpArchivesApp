import {  Middleware } from "redux";
import { batchActions } from "redux-batched-actions";

import { AxiosError } from "axios";

import { loading } from "./actions";
import { IApiCallConfig } from "./actions/search";
import { IReducerState } from "./reducers";

const isApiCallConfig = (obj: any): obj is IApiCallConfig<any> => {
  return "apiCall" in obj;
};

export const callApiMiddleware: Middleware<{}, IReducerState> = ({ getState, dispatch }) => {
  return (next) => async (action: IApiCallConfig<any> | any) => {

    if (isApiCallConfig(action)) {
      const {
        afterApiCall = () => [],
        beforeApiCall = () => [],
        apiCall,
        loadingId = "",
        shouldCallApi = () => true,
        onError = () => []
      } = action;
      const shouldLoad: string = typeof loadingId === "function" ? loadingId(getState()) : loadingId;
      // can return an axios promise to replace the original apiCall
      // used if the current data is bad
      const shouldCallOrReset = shouldCallApi(getState(), dispatch);
      let request: any;

      if (typeof shouldCallOrReset === "boolean") {
        if (shouldCallOrReset) {
          request = apiCall(getState(), dispatch);
        } else {
          return;
        }
      } else {
        request = shouldCallOrReset;
      }

      dispatch(batchActions([
        ...(await beforeApiCall(getState(), dispatch)),
        ...(shouldLoad ? [loading.loadingStart(shouldLoad)] : []),
      ]));

      const response = await request.catch((e: AxiosError) => e);

      dispatch(batchActions([
        ...(await (response instanceof Error ?
            onError(response, getState(), dispatch)
            :
            afterApiCall(response, getState(), dispatch))
        ),
        ...(shouldLoad ? [loading.loadingEnd(shouldLoad)] : []),
      ]));

      return next(action);

    } else {
      return next(action);
    }
  };
};
