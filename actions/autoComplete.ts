import { action } from "typesafe-actions";

import * as ActionTypes from "../actiontypes/autoComplete";

const addAutoComplete = (query: string, categories: string[], results: string[]) => {
  return action(ActionTypes.ADD_AUTOCOMPLETE, { query, categories, results });
};

export default {
  addAutoComplete
};
