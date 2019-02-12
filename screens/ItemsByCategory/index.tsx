import * as React from "react";
import { connect, DispatchProp } from "react-redux";
import { compose } from "recompose";

import { NavigationScreenProps } from "react-navigation";

import { getItemsByCategory as fetchItemsByCategory } from "../../actions/itemsByCategory";
import RenderItem from "../../components/RenderItem";
import { shouldFetchData } from "../../components/shouldFetchData";
import { routes } from "../../components/SideBar";
import { IReducerState } from "../../reducers";
import { getItemsByCategory, ItemsByCategoryData } from "../../reducers/itemsByCategory";
import View from "./View";

export interface ItemsByCategoryProps extends NavigationScreenProps, ItemsByCategoryData {
  fetchNextPage: () => void;
}

export class ItemsByCategory extends React.Component<ItemsByCategoryProps> {

  static navigationOptions = ({ navigation }: NavigationScreenProps) => ({
    title: routes[navigation.getParam("category")].displayName
  });

  renderItem = ({ item }: any) => {
    return <RenderItem item={item} />;
  };

  render() {
    const { results, isLoading, fetchNextPage } = this.props;
    return (
      <View renderItem={this.renderItem} results={results} fetchNextPage={fetchNextPage} isLoading={isLoading} />
    );
  }
}

const makeMapStateToProps = () => {
  const itemsByCategory = getItemsByCategory();
  return (state: IReducerState, props: NavigationScreenProps) => itemsByCategory(state, props);
};

const mergeProps = (stateProps: ItemsByCategoryData, { dispatch }: DispatchProp, ownProps: NavigationScreenProps) => {
  const category = ownProps.navigation.getParam("category");
  return {
    ...stateProps,
    ...ownProps,
    category,
    fetchData: () => dispatch<any>(fetchItemsByCategory(category, false)),
    fetchNextPage: () => {
      dispatch<any>(fetchItemsByCategory(category, stateProps.nextPage));
    }
  };
};

const enhance = compose<ItemsByCategoryProps, ItemsByCategoryProps>(
  connect(makeMapStateToProps, null as any, mergeProps),
  shouldFetchData
);

export default enhance(ItemsByCategory);
