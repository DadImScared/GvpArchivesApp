import * as React from "react";

import { NavigationScreenProps, StackActions } from "react-navigation";

import { Container, Content, NativeBase } from "native-base";

import MenuItem from "./MenuItem";

export interface IRouteComponent {
  component?: any;
  displayName: string;
  icon: NativeBase.Icon;
}

export type IRoute = string | IRouteComponent;

export const routes: { [key: string]: IRouteComponent } = {
  bhagavatpatrika: {
    displayName: "Bhagavat Patrika",
    icon: {
      name: "open-book",
      type: "Entypo"
    }
  },
  book: {
    displayName: "Books",
    icon: {
      name: "book",
      type: "FontAwesome"
    }
  },
  harikatha: {
    displayName: "Harikatha",
    icon: {
      name: "open-book",
      type: "Entypo"
    }
  },
  harmonistmagazine: {
    displayName: "Harmonist Magazine",
    icon: {
      name: "open-book",
      type: "Entypo"
    }
  },
  harmonistmonthly: {
    displayName: "Harmonist Monthly",
    icon: {
      name: "open-book",
      type: "Entypo"
    }
  },
  lecture: {
    displayName: "Lectures",
    icon: {
      name: "headphones",
      type: "MaterialCommunityIcons"
    }
  },
  movie: {
    displayName: "Movies",
    icon: {
      name: "video",
      type: "Entypo"
    }
  },
  song: {
    displayName: "Songs",
    icon: {
      name: "music-note",
      type: "MaterialCommunityIcons"
    }
  }
};

const routesArray = Object.entries(routes);

export const getActiveRoute = (navigationState: any): any => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRoute(route);
  }
  return route;
};

export class SideBar extends React.Component<NavigationScreenProps, { activeRoute: string }> {

  constructor(props: NavigationScreenProps) {
    super(props);
    this.state = {
      activeRoute: "Home"
    };
  }

  navigateRoute = (to: string) => {
    const { navigation } = this.props;
    const { activeRoute } = this.state;
    navigation.closeDrawer();
    if (to === activeRoute || !to) return;

    navigation.dispatch(StackActions.push({
      params: {
        category: to
      },
      routeName: "ItemsByCategory"
    }));
  };

  componentDidUpdate(
    prevProps: Readonly<NavigationScreenProps>,
    prevState: Readonly<{ activeRoute: string }>,
    snapshot?: any
  ): void {
    const route = getActiveRoute(this.props.navigation.state);
    if (route.routeName === "ItemsByCategory") {
      if (this.state.activeRoute !== (route.params as any).category) {
        this.setState({ activeRoute: (route.params as any).category });
      }
    }
    else if (this.state.activeRoute) {
      this.setState({ activeRoute: "" });
    }
  }

  shouldComponentUpdate(
    nextProps: Readonly<NavigationScreenProps>,
    nextState: Readonly<{ activeRoute: string }>, nextContext: any
  ): boolean {
    const { navigation: { state: { index: nextIndex, routes: nextRoutes } } } = nextProps;
    const { navigation: { state: { index: currentIndex, routes: currentRoutes } } } = this.props;
    const currentRoute = currentRoutes[currentIndex].routes[currentRoutes[currentIndex].index].key;
    const nextRoute = nextRoutes[nextIndex].routes[nextRoutes[nextIndex].index].key;
    return nextRoute !== currentRoute || (this.state.activeRoute !== nextState.activeRoute);
  }

  renderRow = ([to, route]: [string, IRouteComponent]) => {
    return (
      <MenuItem
        key={to}
        active={to === this.state.activeRoute}
        navigateRoute={this.navigateRoute}
        to={to}
        display={route.displayName}
      />
    );
  };

  render() {
    return (
        <Container>
          <Content>
            {routesArray.map((route) => this.renderRow(route))}
          </Content>
        </Container>
    );
  }
}

export default SideBar;
