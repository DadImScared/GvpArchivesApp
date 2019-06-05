import * as React from "react";
import { FlatList, View } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { compose, hoistStatics, shouldUpdate } from "recompose";

import { Text } from "native-base";

import { recentSearches } from "../../actions";
import { getSearchResults } from "../../actions/searchResults";
import Loading from "../../components/Loading";
import RenderItem from "../../components/RenderItem";
import { Suggestion } from "../../components/Search";
import { IReducerState } from "../../reducers";
import { getQueryId } from "../../reducers/search";
import { ISearchResultData, makeSelectSearchResults } from "../../reducers/searchResults";
import { getNavigationParams } from "../../utils/navigation";
import { headerRight } from "../Header";

interface IProps extends NavigationScreenProps, ISearchResultData {
  addRecentSearch: (query: string, categories: string[]) => void;
  getSearchResults: (query: string, categories: string[], refresh?: boolean) => void;
}

export const searchParams = (query: string, categories: string[]) => ({
  categories,
  query,
  queryId: getQueryId(query, categories)
});

export class Search extends React.Component<IProps> {

  static navigationOptions = (props: NavigationScreenProps) => ({
    headerRight: headerRight(props),
    title: props.navigation.getParam("query", "")
  });

  componentDidMount() {
    this.fetchResults();
    const [query, categories] = getNavigationParams({ query: "", categories: [] }, this.props.navigation);
    this.props.addRecentSearch(query, categories);
  }

  fetchResults = () => {
    const { navigation } = this.props;
    this.props.getSearchResults(navigation.getParam("query"), navigation.getParam("categories"));
  };

  renderItem = ({ item }: any) => (
    <RenderItem item={item} />
  );

  onPressSuggestion = (query: string) => {
    const [categories] = getNavigationParams({ categories: [] }, this.props.navigation);
    this.props.navigation.push(
      "Search",
      searchParams(query, categories)
    );
  };

  keyExtractor = (item: any, index: number) => `${item.item_id}-${index}`;

  renderSuggestions = () => {
    const { suggestions } = this.props;
    return (
      <View style={{ padding: 8 }}>
        <Text>You might be interested in: </Text>
        <View style={{ flexWrap: "wrap", flexDirection: "row", alignItems: "flex-start" }}>
          {
            suggestions.map((suggestion, index) => (
              <Suggestion
                key={`${suggestion}-${index}`}
                onPressSuggestion={this.onPressSuggestion}
                suggestion={suggestion}
              />
            ))
          }
        </View>
      </View>
    );
  };

  render() {
    const { results, isLoading } = this.props;
    return (
      <View>
        {
          (results.length || isLoading) ?
            <FlatList
              keyExtractor={this.keyExtractor}
              data={results}
              renderItem={this.renderItem}
              onEndReached={this.fetchResults}
              ListFooterComponent={<Loading isLoading={isLoading} />}
              ListHeaderComponent={this.props.suggestions.length ? this.renderSuggestions() : null}
            />
            :
            <Text>No results</Text>
        }
      </View>
    );
  }
}

const mapStateToProps = () => {
  const selectSearchResults = makeSelectSearchResults();
  return (state: IReducerState, props: NavigationScreenProps) => selectSearchResults(state, props);
};

const mapDispatchToProps = (dispatch: any) => ({
  addRecentSearch: (query: string, categories: string[]) => dispatch(recentSearches.addSearch(query, categories)),
  getSearchResults: (query: string, categories: string[], refresh = false) => {
    dispatch(getSearchResults(query, categories, refresh));
  }
});

const enhance = hoistStatics<IProps>(
  compose(
    connect(mapStateToProps, mapDispatchToProps),
    shouldUpdate(
      (props, nextProps: IProps) => nextProps.navigation.isFocused() && props.isLoading !== nextProps.isLoading
    )
  )
);

export default enhance(Search);
