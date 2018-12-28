
import itemsByCategoryactions, { ItemsByCategoryActions } from "./itemsByCategory";
import itemsByIdActions, { ItemsByIdActions } from "./itemsById";
import loadingActions, { ILoadingActions } from "./loading";

interface IActions {
  loading: ILoadingActions;
  itemsByCategory: ItemsByCategoryActions;
  itemsById: ItemsByIdActions;
}

const actions: IActions = {
  itemsByCategory: itemsByCategoryactions,
  itemsById: itemsByIdActions,
  loading: loadingActions
};

export default actions;
