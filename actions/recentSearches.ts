import { action } from "typesafe-actions";

import { ADD_SEARCH } from "../actiontypes/recentSearches";

const addSearch = (query: string, categories: string[]) => {
  return action(ADD_SEARCH, { query, categories });
};

export default {
  addSearch
};
