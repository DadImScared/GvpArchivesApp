import * as React from "react";

import { Body, ListItem, Right, Text } from "native-base";

import Icon from "./Icon";
import { IRouteComponent } from "./SideBar";

export interface IMenuItemProps {
  to: string;
  route: IRouteComponent;
  navigateRoute: (to: string, route?: IRouteComponent) => void;
  active: boolean;
}

export class MenuItem extends React.Component<IMenuItemProps> {

  navigateRoute = () => {
    const { to, navigateRoute, route } = this.props;
    navigateRoute(to, route);
  };

  shouldComponentUpdate(nextProps: IMenuItemProps) {
    const { active } = this.props;
    return active !== nextProps.active;
  }

  render() {
    const { route, active } = this.props;
    return (
      <ListItem
        icon={true}
        selected={active}
        onPress={this.navigateRoute}
        button={true}
      >
        <Body>
          <Text>{route.displayName}</Text>
        </Body>
        <Right>
          <Icon {...route.icon} />
        </Right>
      </ListItem>
    );
  }
}

export default MenuItem;
