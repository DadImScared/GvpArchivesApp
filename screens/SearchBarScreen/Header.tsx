import * as React from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import _ from "lodash";
import { Header as BaseHeader, Input, Item } from "native-base";

import Icon from "../../components/Icon";

import { search } from "../../actions";
import { getQuerySuggestions } from "../../actions/search";
import { IReducerState } from "../../reducers";
import { getQueryId, getSearch, SearchStateAndActions } from "../../reducers/search";

interface IProps extends NavigationScreenProps, SearchStateAndActions<"query" | "updateSearchQuery" | "categories"> {
  getQuerySuggestions: (query: string, categories: string[]) => any;
}

const styles: any = StyleSheet.create({
  header: {
    backgroundColor: "white",
    borderBottomWidth: 0,
    height: 40,
    paddingTop: 0
  }
});

export class Header extends React.Component<IProps> {
  textRef!: any;
  didFocus!: any;
  willBlur!: any;

  querySuggestions = _.debounce(this.props.getQuerySuggestions, 150);

  componentDidMount() {
    const { query, categories } = this.props;
    this.didFocus = this.props.navigation.addListener("didFocus", () => {
      this.textRef && this.textRef._root.focus();
      BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    });
    this.willBlur = this.props.navigation.addListener("willBlur", () => {
      // console.log("will blur");
      BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
    });

    if (query) {
      this.props.getQuerySuggestions(query, categories);
    }
  }

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any): void {
    const { navigation: { state: { routes } }, query, categories } = this.props;
    const { index } = routes[0];
    // when auto complete screen re-focuses fetch data
    if ((index !== prevProps.navigation.state.routes[0].index) && index === 0) {
      this.props.getQuerySuggestions(query, categories);
    }
  }

  componentWillUnmount(): void {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
    this.didFocus && this.didFocus.remove();
    this.willBlur && this.willBlur.remove();
  }

  setTextRef = (el: Input) => this.textRef = el;

  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };

  updateQuery = (query: string) => {
    this.props.updateSearchQuery(query);
    this.querySuggestions(query, this.props.categories);
  };

  navigateToSearch = () => {
    const { categories, query } = this.props;
    const parentNavigation = this.props.navigation.dangerouslyGetParent();
    const params = { query, categories, queryId: getQueryId(query, categories) };
    if (parentNavigation) parentNavigation.replace("Search", params);
    // this.props.navigation.push("Search", { query, categories, queryId: getQueryId(query, categories) });
  };

  render() {
    return (
      <View style={{ width: "100%" }}>
        <BaseHeader noShadow={true} style={styles.header} searchBar={true}>
          <Item rounded={true}>
            <Icon name={"ios-search"} />
            <Input
              value={this.props.query}
              onSubmitEditing={this.navigateToSearch}
              onChangeText={this.updateQuery}
              ref={this.setTextRef}
              placeholder={"Search"}
            />
          </Item>
        </BaseHeader>
      </View>
    );
  }
}

const mapStateToProps = (state: IReducerState) => getSearch(state);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getQuerySuggestions: (...args: any[]) => dispatch((getQuerySuggestions as any)(...args)),
  updateSearchQuery: (query: string) => dispatch(search.updateSearchQuery(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
