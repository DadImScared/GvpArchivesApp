import axios, { AxiosPromise } from "axios";
import { AnyAction, Dispatch } from "redux";
import { action } from "typesafe-actions";

import * as ActionTypes from "../actiontypes/search";
import { AUTOCOMPLETE_QUERY } from "../loadingPrefix";
import { IReducerState } from "../reducers";
import { getQueryId } from "../reducers/search";
import autoComplete from "./autoComplete";
import { BASE_URL } from "./itemsById";

const autoCompleteUrl = `${BASE_URL}/api/v1/completeme/`;

export const isValidValidTimeToLive = (time: number) => time ? time >= +new Date() : false;

const updateSearchQuery = (query: string) => action(ActionTypes.UPDATE_SEARCH_QUERY, query);

type ApiCallCallback<ReturnType> = (
  state: IReducerState,
  dispatch: Dispatch
) => ReturnType;

type IAfterApiCall<Data> = (
  data: Data,
  state: IReducerState,
  dispatch: Dispatch
) => Promise<AnyAction[]> | AnyAction[];

export interface IApiCallConfig<Data> {
  afterApiCall?: IAfterApiCall<Data>;
  apiCall: ApiCallCallback<AxiosPromise<any>>;
  beforeApiCall?: ApiCallCallback<Promise<AnyAction[]> | AnyAction[]>;
  loadingId?: ((state: IReducerState) => string) | string;
  shouldCallApi?: ApiCallCallback<boolean | AxiosPromise<void>>;
}

export const getQuerySuggestions = (query: string, categories: string[]): IApiCallConfig<string[]> => {
  const queryId = getQueryId(query, categories);
  const loadingId = `${AUTOCOMPLETE_QUERY}${queryId}`;
  return {
    loadingId,
    afterApiCall: (data) => {
      return [
        autoComplete.addAutoComplete(
          query,
          categories,
          data.map((textObj: any) => textObj.text)
        )
      ];
    },
    apiCall: () => axios.get(`${autoCompleteUrl}${query}`),
    shouldCallApi: (state) => {
      const isLoading = state.loading[loadingId];
      if (!query || isLoading) return false;

      const currentAutoComplete = state.autoComplete[queryId];
      if (!currentAutoComplete) return true;

      return isValidValidTimeToLive(currentAutoComplete.timeToLive) ?
        false
        :
        axios.get(`${autoCompleteUrl}${query}`);
    }
  };
};

export default {
  updateSearchQuery
};
