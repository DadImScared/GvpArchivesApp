import axios, { AxiosPromise, AxiosResponse } from "axios";
import { AnyAction, Dispatch } from "redux";
import { action } from "typesafe-actions";

import * as ActionTypes from "../actiontypes/search";
import { AUTOCOMPLETE_QUERY } from "../loadingPrefix";
import { IReducerState } from "../reducers";
import { getCategoriesWithDefault } from "../reducers/autoComplete";
import { CATEGORIES, getQueryId } from "../reducers/search";
import { makeQueryString } from "../utils/queryString";
import autoComplete from "./autoComplete";
import { BASE_URL } from "./itemsById";

const autoCompleteUrl = `${BASE_URL}/api/v1/completeme/`;

export const isValidValidTimeToLive = (time: number) => time ? time >= +new Date() : false;

const updateSearchQuery = (query: string) => action(ActionTypes.UPDATE_SEARCH_QUERY, query);

const toggleCategory = (category: string) => action(ActionTypes.TOGGLE_CATEGORIES, category);

const selectAllCategories = () => action(ActionTypes.SELECT_ALL_CATEGORIES, CATEGORIES);

const removeAllCategories = () => action(ActionTypes.REMOVE_ALL_CATEGORIES, CATEGORIES);

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
  onError?: (e: any, state: IReducerState, dispatch: Dispatch) => Promise<AnyAction[]> | AnyAction[];
  type: string;
}

export const getQuerySuggestions = (
  query: string, selectedCategories: string[]
): IApiCallConfig<AxiosResponse<string[]>> => {
  const categories = getCategoriesWithDefault(selectedCategories);
  const queryId = getQueryId(query, categories);
  const loadingId = `${AUTOCOMPLETE_QUERY}${queryId}`;
  return {
    loadingId,
    afterApiCall: (response) => {
      return [
        autoComplete.addAutoComplete(
          query,
          categories,
          response.data.map((textObj: any) => textObj.text)
        )
      ];
    },
    apiCall: () => axios.get(`${autoCompleteUrl}${query}?${makeQueryString({ categories })}`),
    shouldCallApi: (state) => {
      const isLoading = state.loading[loadingId];
      if (!query || isLoading) return false;

      const currentAutoComplete = state.autoComplete[queryId];
      if (!currentAutoComplete) return true;

      return !isValidValidTimeToLive(currentAutoComplete.timeToLive);
    },
    type: "callApiMiddleware",
  };
};

export default {
  removeAllCategories,
  selectAllCategories,
  toggleCategory,
  updateSearchQuery
};
