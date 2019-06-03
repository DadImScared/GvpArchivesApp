import * as React from "react";
import { FlatList, ListRenderItem, Text, View } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { compose } from "recompose";

import { Spinner } from "native-base";

import { IReducerState } from "../../reducers";
import { getAutoCompleteScreen, IAutoCompleteScreenData } from "../../reducers/autoComplete";

import ListItem from "../../components/SearchBarScreen/AutoCompleteListItem";

interface IProps extends IAutoCompleteScreenData, NavigationScreenProps {}

class AutoComplete extends React.Component<IProps> {
  renderListItem: ListRenderItem<string> = ({ item }) => {
    const { navigation, query, categories } = this.props;
    return <ListItem navigation={navigation} query={query} categories={categories} text={item}/>;
  };

  keyExtractor = (item: string, index: number) => `${item}-${this.props.queryId}-${index}`;

  render() {
    const { isLoading, query, autoComplete: { results } } = this.props;
    return (
      <View>
        {
          query ?
            isLoading || isLoading === undefined ?
              <Spinner color={"green"}/>
              :
              results.length ?
                <FlatList
                  keyboardShouldPersistTaps={"always"}
                  keyExtractor={this.keyExtractor}
                  data={results}
                  renderItem={this.renderListItem}
                />
                :
                <Text>No suggestions</Text>
            :
            <Text>Type in the search bar to see suggestions!</Text>
        }
      </View>
    );
  }
}

const mapStateToProps = (state: IReducerState) => getAutoCompleteScreen(state);

const enhance = compose<any, any>(
  connect(mapStateToProps)
);

export default enhance(AutoComplete);
