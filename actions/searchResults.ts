import axios, { AxiosResponse } from "axios";
import { action } from "typesafe-actions";

import * as ActionTypes from "../actiontypes/searchResults";
import { SEARCH_RESULTS } from "../loadingPrefix";
import { getCategoriesWithDefault } from "../reducers/autoComplete";
import { Item } from "../reducers/itemsById";
import { getQueryId } from "../reducers/search";
import { makeQueryString } from "../utils/queryString";
import { addItemsById, BASE_URL } from "./itemsById";
import { IApiCallConfig, isValidValidTimeToLive } from "./search";

const SEARCH_URL = `${BASE_URL}/api/v1/search`;

export interface ISearchItem extends Item {
  highlightedTitle?: string;
  highlightedBody?: string;
}

interface ISearchResults {
  nextPage: string | boolean;
  results: ISearchItem[];
  suggestions: Array<{ text: string }>;
}

export interface INormalizedSearchResults { item_id: string; highlightedBody?: string; highlightedTitle?: string; }

const addSearch = (
  queryId: string,
  results: INormalizedSearchResults[],
  suggestions: string[],
  nextPage: boolean | string
) => action(ActionTypes.ADD_SEARCH, { queryId, results, suggestions, nextPage });

const updateSearch = (
  queryId: string,
  results: INormalizedSearchResults[],
  suggestions: string[],
  nextPage: boolean | string
) => action(ActionTypes.UPDATE_SEARCH, { queryId, results, suggestions, nextPage });

export const normalizeSearchResults = (items: ISearchItem[]) => {
  const itemsById: { [key: string]: Item } = {};
  const normalizedValues: INormalizedSearchResults[] = [];
  items.forEach(({highlightedBody, highlightedTitle, ...item }) => {
    normalizedValues.push({
      item_id: item.item_id,
      [highlightedBody ? "highlightedBody" : "highlightedTitle"]: highlightedBody || highlightedTitle
    });
    itemsById[item.item_id] = item;
  });
  return {
    itemsById,
    results: normalizedValues
  };
};

export const getSearchResults = (
  query: string,
  selectedCategories: string[],
  refresh = false
): IApiCallConfig<AxiosResponse<ISearchResults>> => {
  const categories = getCategoriesWithDefault(selectedCategories);
  const queryId = getQueryId(query, categories);
  const loadingId = `${SEARCH_RESULTS}${queryId}`;
  const firstPage = `${SEARCH_URL}/${query}/?${makeQueryString({ categories })}`;
  let shouldUpdateSearch = false;
  return {
    loadingId,
    afterApiCall: ({ data }) => {
      // const { result: itemIds, entities: { items } } = normalize(data.results, itemSchema);
      const { itemsById, results } = normalizeSearchResults(data.results);
      return [
        addItemsById(itemsById),
        // add or update search based on bool 'shouldUpdateSearch'
        (shouldUpdateSearch ? updateSearch : addSearch)(
          queryId,
          results,
          data.suggestions.map((suggestion) => suggestion.text),
          data.nextPage
        )
      ];
    },
    apiCall: (state) => axios.get(firstPage),
    shouldCallApi: (state) => {
      if (refresh) return true;
      const isLoading = state.loading[loadingId];

      if (!query || isLoading) return false;

      const currentSearch = state.searchResults[queryId];
      if (!currentSearch) return true;

      if (isValidValidTimeToLive(currentSearch.timeToLive)) {
        if (currentSearch.nextPage) {
          shouldUpdateSearch = true;
          return axios.get(`${BASE_URL}${currentSearch.nextPage}`);
        }
        return false;
      }

      return true;
    },
    type: "callApiMiddleware"
  };
};

export default {
  addSearch,
  updateSearch
};
