import * as React from "react";

interface IProps {
  [key: string]: any;
  navigation: { [key: string]: any };
}

export class HomeCategoryNavigation extends React.Component<IProps> {
  onPress = () => {
    this.props.navigation.navigate("ItemsByCategory", { category: this.props.category });
  };

  render() {
    return (
      React.cloneElement(
        (this.props.children as any),
        { onPress: this.onPress,
          style: { marginRight: 8, marginTop: 8, ...this.props.style }
        }
       )
    );
  }
}

export default HomeCategoryNavigation;
