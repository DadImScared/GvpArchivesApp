import * as React from "react";

import { NavigationScreenProps, StackActions } from "react-navigation";

import { Container, Content } from "native-base";

import MenuItem from "./MenuItem";

export interface IRouteComponent {
  component: any;
  displayName: string;
}

export type IRoute = string | IRouteComponent;

export const routes: { [key: string]: IRoute } = {
  bhagavatpatrika: "Bhagavat Patrika",
  book: "Books",
  harikatha: "Harikatha",
  harmonistmagazine: "Harmonist Magazine",
  harmonistmonthly: "Harmonist Monthly",
  lecture: "Lectures",
  movie: "Movies",
  song: "Songs"
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

  renderRow = ([to, displayName]: [string, IRoute]) => {
    return (
      <MenuItem
        key={to}
        active={to === this.state.activeRoute}
        navigateRoute={this.navigateRoute}
        to={to}
        display={displayName}
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
