import * as React from "react";

import { ScreenOrientation } from "expo";
import { ScrollView } from "react-native";
import { NavigationScreenProps } from "react-navigation";

import CategoryCard from "../components/Home/CategoryCard";
import { categoryDescriptions } from "../utils/home";
import { headerRight } from "./Header";

export interface ICategoryCard {
  actions: [(props: any) => JSX.Element];
  body: string;
  id: string;
  title: ((props: any) => JSX.Element) | string;
  uri: string;
}

export default class HomeScreen extends React.Component<NavigationScreenProps> {
  static navigationOptions = (props: NavigationScreenProps) => ({
    headerRight: headerRight(props),
    title: "Home"
  });

  componentDidMount() {
    (ScreenOrientation as any).allowAsync(ScreenOrientation.Orientation.ALL);
  }

  render() {
    return (
      <ScrollView style={{ padding: 8 }}>
        {
          categoryDescriptions.map((card) => {
            const id = card.id;
            return (
              <CategoryCard card={card} key={id} {...this.props} />
            );
          })
        }
      </ScrollView>
    );
  }
}
