import * as React from "react";
import { ScaledSize, ScrollView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Dispatch } from "redux";

import _ from "lodash";
import { Button, Text } from "native-base";

import { search } from "../../actions";
import ListItem from "../../components/SearchBarScreen/FilterListItem";
import { withDimensions } from "../../components/withDimensions";
import { IReducerState } from "../../reducers";
import { CATEGORIES, getSearch, SearchStateAndActions } from "../../reducers/search";

interface IProps extends ScaledSize, SearchStateAndActions<
  "categories" | "toggleCategory" | "selectAllCategories" | "removeAllCategories"
> {}

const styles = StyleSheet.create({
  innerScrollViewWrapper: {
    paddingBottom: 8,
    paddingTop: 12,
    width: "100%"
  },
  scrollView: {
    flexDirection: "row",
    flexGrow: 1,
    flexWrap: "wrap"
  },
  selectCategoriesButtons: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

export class Filter extends React.Component<IProps> {

  rows: any = {};

  categoriesCounted: Set<string> = new Set();

  columnWidths: any = {};

  state = {
    rowsCalculated: false
  };

  handleRowsMeasured  = () => {
    let categories: string[] = [];
    let rowWidth = 0;
    _.sortBy(Object.keys(this.rows), (o) => o).forEach((category, index, arr) => {
      // get original width of category col
      const categoryWidth = this.rows[category];
      const tooWide = rowWidth + categoryWidth > this.props.width;

      if (index === arr.length - 1) {
        if (tooWide) {
          this.setRowWidth(categoryWidth, [category]);
        } else {
          categories.push(category);
          rowWidth += categoryWidth;
          const colWidth = this.props.width / categories.length;
          this.setRowWidth(colWidth, categories);
        }
      }

      if (tooWide) {
        const colWidth = this.props.width / categories.length;
        categories.forEach((rowCategory) => {
          this.columnWidths[rowCategory] = colWidth;
        });
        // reset to new row
        categories = [category];
        rowWidth = categoryWidth;
      }
      else {
        categories.push(category);
        rowWidth += categoryWidth;
      }
    });
    this.setState({ rowsCalculated: true });
  };

  addToCurrentRow = (category: string, width: number) => {
    this.rows[category] = width;
    this.categoriesCounted.add(category);
    // last category for measuring or a remeasure
    if (this.categoriesCounted.size === CATEGORIES.length) {
      this.handleRowsMeasured();
    }
  };

  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<{}>, snapshot?: any): void {
    if (prevProps.width !== this.props.width) {
      this.handleRowsMeasured();
    }
  }

  setRowWidth = (width: number, categories: string[]) => {
    categories.forEach((category) => this.columnWidths[category] = width);
  };

  renderCategories = () => {
    return CATEGORIES.map((category) => (
      <View
        key={category}
        style={{
          opacity: this.state.rowsCalculated ? 1 : 0,
          width: this.props.width > 400 ? this.columnWidths[category] : "100%"
        }}
      >
      <ListItem
        selected={this.props.categories.includes(category)}
        toggleCategory={this.props.toggleCategory}
        category={category}
        addRow={this.addToCurrentRow}
      />
      </View>
    ));
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollView} horizontal={false}>
          <View style={styles.innerScrollViewWrapper}>
            <View style={styles.selectCategoriesButtons}>
              <Button onPress={this.props.selectAllCategories}>
                <Text>Select All</Text>
              </Button>
              <Button warning={true} onPress={this.props.removeAllCategories}>
                <Text>Remove All</Text>
              </Button>
            </View>
          </View>
          {this.renderCategories()}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state: IReducerState) => getSearch(state);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeAllCategories: () => dispatch(search.removeAllCategories()),
  selectAllCategories: () => dispatch(search.selectAllCategories()),
  toggleCategory: (category: string) => dispatch(search.toggleCategory(category))
});

const enhance = compose<IProps, IProps>(
  withDimensions("window"),
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(Filter);
