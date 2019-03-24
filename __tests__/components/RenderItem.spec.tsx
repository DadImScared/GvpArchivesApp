import * as React from "react";
import { Provider } from "react-redux";
import * as renderer from "react-test-renderer";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

jest.mock("../../components/Icon", () => "Icon");

import { IRenderItemProps, RenderItem } from "../../components/RenderItem";
import reducers from "../../reducers";

let props: IRenderItemProps;

const makeStore = () => createStore(reducers, compose(applyMiddleware(thunk)));

describe("RenderItem", () => {
  beforeEach(() => {
    props = {
      item: {
        category: "song",
        item_id: "1",
        link: "itemlink",
        title: "itemtitle"
      }
    };
  });

  it("should render default component", () => {
    props = {
      item: {
        ...props.item,
        category: "harmonistmonthly"
      }
    };

    const tree = renderer.create(
      <Provider store={makeStore()}>
        <RenderItem {...props} />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render custom component", () => {
    const tree = renderer.create(
      <Provider store={makeStore()}>
        <RenderItem {...props} />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
