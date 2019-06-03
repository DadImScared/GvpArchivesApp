import * as React from "react";
import { Platform, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import { Body, H2, ListItem, Text } from "native-base";

import { IRecentSearch } from "../../reducers/recentSearches";
import { searchParams } from "../../screens/Search";
import { wrapper } from "../../styles";
import Icon from "../Icon";
import { routes } from "../SideBar";

interface IProps {
  search: IRecentSearch;
  navigation: NavigationScreenProp<any>;
}

export class RecentSearchItem extends React.Component<IProps> {

  navigateSearch = () => {
    const { search, navigation } = this.props;
    const parentNavigation = (navigation as any).dangerouslyGetParent().dangerouslyGetParent().dangerouslyGetParent();
    parentNavigation.replace("Search", searchParams(search.query, search.categories));
  };

  render() {
    const { search: { categories, query, timestamp } } = this.props;
    return (
      <ListItem button={true} onPress={this.navigateSearch}>
        <Body>
          <H2>{query}</H2>
          <View style={wrapper.inline}>
            {
              categories.map((category, index) => (
                <Text
                  key={`${query}-${timestamp}-${index}`}
                  style={{
                    backgroundColor: routes[category].icon.style.color,
                    color: "white",
                    fontSize: 14,
                    marginBottom: 0,
                    marginLeft: 0,
                    marginRight: 4,
                    marginTop: 4,
                    padding: 4,
                    ...Platform.select<any>({
                      android: {
                        borderRadius: 25
                      },
                      ios: {
                        borderRadius: 12,
                        overflow: "hidden"
                      }
                    }),
                  }}
                >
                  {routes[category].displayName.toUpperCase()}
                </Text>
              ))
            }
          </View>
        </Body>
        <Icon name={"arrow-forward"} />
      </ListItem>
    );
  }
}

export default RecentSearchItem;
