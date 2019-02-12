import * as React from "react";

import { Icon as NativeBaseIcon, NativeBase } from "native-base";

export class Icon extends React.Component<NativeBase.Icon> {
  render() {
    return (
      <NativeBaseIcon {...this.props} />
    );
  }
}

export default Icon;
