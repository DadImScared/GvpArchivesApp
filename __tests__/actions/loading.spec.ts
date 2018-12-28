import actions from "../../actions";

describe("loading actions", () => {
  test("loadingStart", () => {
    expect(actions.loading.loadingStart("LOADING_ID")).toMatchSnapshot();
  });

  test("loadingEnd", () => {
    expect(actions.loading.loadingEnd("LOADING_ID")).toMatchSnapshot();
  });
});
