import * as React from "react";

import { FlatList } from "react-native";

import Loading from "../../components/Loading";
import { Item } from "../../reducers/itemsById";

export interface ICategoryViewProps {
  results: Item[];
  isLoading: boolean;
  fetchNextPage: () => void;
  renderItem: (item: any) => React.ReactElement<any>;
}

export class View extends React.Component<ICategoryViewProps> {

  keyExtractor = (item: any) => item.item_id;

  render() {
    const {results, isLoading, fetchNextPage, renderItem } = this.props;
    return (
      <FlatList
        data={results}
        keyExtractor={this.keyExtractor}
        renderItem={renderItem}
        onEndReached={fetchNextPage}
        ListFooterComponent={<Loading isLoading={isLoading}/>}
      />
    );
  }
}

export default View;
