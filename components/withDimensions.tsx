import * as React from "react";
import { Dimensions, ScaledSize } from "react-native";

import _ from "lodash";
import {
  compose,
  hoistStatics,
  lifecycle,
  mapProps,
  withStateHandlers
} from "recompose";

interface IDimensionsEvent {
  window: ScaledSize;
  screen: ScaledSize;
}

interface IWidthProps {
  width: number;
  updateDimensions: () => void;
}

interface IWidthHandlers extends IWidthProps {
  onChange: (event: IDimensionsEvent) => void;
}

const withDimensionsState = (dim: "window" | "screen") => {
  return withStateHandlers(
    Dimensions.get(dim),
    {
      onChange: () => (e: IDimensionsEvent) => e[dim],
      updateDimensions: () => () => (Dimensions.get(dim))
    }
  );
};

const withDimensionsLifecyle = lifecycle<IWidthHandlers, any>({
  componentDidMount() {
    const { onChange, updateDimensions } = this.props;
    updateDimensions();
    Dimensions.addEventListener("change", onChange);
  },
  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.props.onChange);
  }
});

export const withDimensions = <Inner extends any>(dim: "window" | "screen") => hoistStatics<Inner>(
  compose(
    withDimensionsState(dim),
    withDimensionsLifecyle,
    mapProps((props) => _.omit(props, ["onChange", "updateDimensions"]))
  )
);
