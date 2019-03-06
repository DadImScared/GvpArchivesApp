
import audioPlayerActions, { IAudioPlayerActions } from "./audioPlayer";
import itemsByCategoryActions, { ItemsByCategoryActions } from "./itemsByCategory";
import itemsByIdActions, { ItemsByIdActions } from "./itemsById";
import loadingActions, { ILoadingActions } from "./loading";

interface IActions {
  audioPlayer: IAudioPlayerActions;
  loading: ILoadingActions;
  itemsByCategory: ItemsByCategoryActions;
  itemsById: ItemsByIdActions;
}

const actions: IActions = {
  audioPlayer: audioPlayerActions,
  itemsByCategory: itemsByCategoryActions,
  itemsById: itemsByIdActions,
  loading: loadingActions
};

export default actions;
