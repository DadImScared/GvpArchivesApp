import { autoComplete } from "../../actions";

describe("autoComplete", () => {
  it("should add auto complete", () => {
    expect(autoComplete.addAutoComplete("query", ["book"], ["texthere"])).toMatchSnapshot();
  });
});
