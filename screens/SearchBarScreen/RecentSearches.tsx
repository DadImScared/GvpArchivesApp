import * as React from "react";
import { FlatList, ListRenderItem } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";

import RecentSearchItem from "../../components/SearchBarScreen/RecentSearchItem";
import { IReducerState } from "../../reducers";
import { IRecentSearch, RecentSearches as RecentSearch } from "../../reducers/recentSearches";

interface IProps extends NavigationScreenProps {
  searches: RecentSearch;
}

export class RecentSearches extends React.Component<IProps> {
  renderListItem: ListRenderItem<IRecentSearch> = ({ item }) => (
    <RecentSearchItem search={item} navigation={this.props.navigation}/>
  );

  keyExtractor = ({ query, timestamp }: IRecentSearch, index: number) => {
    return `${query}-${timestamp}-${index}`;
  };

  render() {
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        renderItem={this.renderListItem}
        data={this.props.searches}
      />
    );
  }
}

const mapStateToProps = (state: IReducerState) => ({ searches: state.recentSearches });

export default connect(mapStateToProps)(RecentSearches);
