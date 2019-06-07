import * as React from "react";
import * as renderer from "react-test-renderer";

import { Button } from "native-base";

import { CategoryCard } from "../../../components/Home/CategoryCard";
import { categoryDescriptions } from "../../../utils/home";

describe("CategoryCard", () => {
  it("should navigate to movie screen", () => {
    const tree = renderer.create(
      <CategoryCard
        card={categoryDescriptions[0]}
        navigation={{
          navigate: (...args: any[]) => {
            expect(args).toMatchSnapshot();
          }
        }}
      />
    );
    const instance = tree.root;
    instance.findAllByType(Button)[0].props.onPress();
  });
});
