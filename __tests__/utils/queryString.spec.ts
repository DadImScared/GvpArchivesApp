import { makeQueryString } from "../../utils/queryString";

describe("queryString", () => {
  it("should create query string from object", () => {
    expect(
      makeQueryString({ categories: ["book", "song"] })
    ).toEqual("categories=book&categories=song");
  });
});
