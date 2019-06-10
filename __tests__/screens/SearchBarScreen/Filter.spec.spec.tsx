import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";

import { Button, CheckBox, ListItem } from "native-base";

jest.useFakeTimers();
// jest.mock("ScrollView", () => require.requireMock("ScrollViewMock"));

import { Filter } from "../../../screens";
import { makeStore } from "../../../storybook/utils/decorators";

jest.mock("native-base", () => {
  const realModule = require.requireActual("native-base");
  return {
    ...realModule,
    CheckBox: "Checkbox"
  };
});

describe("Filter", () => {
  let props: any;
  let tree: any;

  beforeEach(() => {
    props = {
      fontScale: 1,
      height: 400,
      scale: 1,
      width: 400
    };
    const store = makeStore();
    tree = renderer.create(
      <Provider store={store}>
        <Filter {...props} />
      </Provider>
    );
  });

  it("should toggle checkbox onPress", () => {
    const instance = tree.root;
    expect(instance.findAllByType(CheckBox)[0].props.checked).toEqual(true);
    instance.findAllByType(ListItem)[0].props.onPress();
    jest.runAllTimers();
    expect(instance.findAllByType(CheckBox)[0].props.checked).toEqual(false);
  });

  it("should remove all categories and add all categories", () => {
    const instance = tree.root;
    instance.findAllByType(Button)[1].props.onPress();
    instance.findAllByType(CheckBox).forEach((checkbox: any) => {
      expect(checkbox.props.checked).toEqual(false);
    });

    instance.findAllByType(Button)[0].props.onPress();
    instance.findAllByType(CheckBox).forEach((checkbox: any) => {
      expect(checkbox.props.checked).toEqual(true);
    });
  });
});
