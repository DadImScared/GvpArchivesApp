import moment from "moment";

import { autoComplete } from "../../actions";
import reducer from "../../reducers/autoComplete";

describe("autoComplete", () => {
  it("should add auto complete", () => {
    moment.now = () => 1555834576011;
    const results: any = reducer({}, autoComplete.addAutoComplete("query", ["book"], ["text"]));
    expect(results["query-book"].timeToLive).toEqual(moment(1555834576011).add(1, "days").valueOf());
    expect(
      results
    ).toMatchSnapshot();
  });
});
