import { loading } from "../../actions";

describe("loading actions", () => {
  test("loadingStart", () => {
    expect(loading.loadingStart("LOADING_ID")).toMatchSnapshot();
  });

  test("loadingEnd", () => {
    expect(loading.loadingEnd("LOADING_ID")).toMatchSnapshot();
  });
});
