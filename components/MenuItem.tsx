import * as React from "react";

import { ListItem, Text } from "native-base";

import { IRoute } from "./SideBar";

export interface IMenuItemProps {
  to: string;
  display: IRoute;
  navigateRoute: (to: string) => void;
  active: boolean;
}

export class MenuItem extends React.Component<IMenuItemProps> {

  navigateRoute = () => {
    const { to, navigateRoute } = this.props;
    navigateRoute(to);

  };

  shouldComponentUpdate(nextProps: IMenuItemProps) {
    const { active } = this.props;
    return active !== nextProps.active;
  }

  render() {
    const { display, active } = this.props;
    return (
      <ListItem selected={active} onPress={this.navigateRoute} button={true}><Text>{display}</Text></ListItem>
    );
  }
}

export default MenuItem;
