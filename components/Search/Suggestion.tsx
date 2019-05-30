import * as React from "react";
import { StyleSheet } from "react-native";

import { Button, NativeBase, Text } from "native-base";

interface IProps extends NativeBase.Button {
  suggestion: string;
  onPressSuggestion: (suggestion: string) => void;
}

const styles: any = StyleSheet.create({
  button: { margin: 8, padding: 8, paddingTop: 8, paddingBottom: 8 }
});

export class Suggestion extends React.Component<IProps> {

  onPressSuggestion = () => {
    this.props.onPressSuggestion(this.props.suggestion);
  };

  render() {
    const { suggestion, onPressSuggestion, ...other } = this.props;
    return (
      <Button small={true} primary={true} style={styles.button} onPress={this.onPressSuggestion} {...other}>
        <Text>{suggestion}</Text>
      </Button>
    );
  }
}

export default Suggestion;
