import { loading } from "../../actions";
import reducer from "../../reducers/loading";

describe("loading reducer", () => {
  test("initialState", () => {
    expect(reducer(undefined, {} as any)).toMatchSnapshot();
  });

  test("loading start", () => {
    expect(reducer(undefined, loading.loadingStart("LOADING_ID"))).toMatchSnapshot();
  });

  test("loading end", () => {
    expect(reducer({ LOADING_ID: true }, loading.loadingEnd("LOADING_ID"))).toMatchSnapshot();
  });
});
