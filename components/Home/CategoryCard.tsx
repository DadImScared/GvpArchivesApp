import * as React from "react";
import { View } from "react-native";

import { Body, Card, CardItem, Text, Thumbnail } from "native-base";
import { ICategoryCard } from "../../screens/HomeScreen";

interface IProps {
  card: ICategoryCard;
  [key: string]: any;
}

export class CategoryCard extends React.Component<IProps> {
  render() {
    const { card } = this.props;
    const id = card.id;
    const isTitleString = typeof card.title === "string";
    const title = typeof card.title === "string" ? card.title : card.title(this.props);
    return (
      <Card key={id}>
        <CardItem header={true} style={{ justifyContent: "flex-start", flexDirection: "row" }}>
          {
            card.uri ?
              <View style={{ paddingRight: 20 }}>
                <Thumbnail
                  large={true}
                  source={{ uri: card.uri }}
                />
              </View>
              :
              null
          }
          {
            isTitleString ?
              <Text>
                {title}
              </Text>
              :
              title
          }
        </CardItem>
        <CardItem>
          <Body>
          <Text>{card.body}</Text>
          </Body>
        </CardItem>
        <CardItem footer={true} style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {
            card.actions.map((ActionButton: any, index: number) => {
              return <ActionButton {...this.props} card={card} key={`${id}-${index}`} />;
            })
          }
        </CardItem>
      </Card>
    );
  }
}

export default CategoryCard;
