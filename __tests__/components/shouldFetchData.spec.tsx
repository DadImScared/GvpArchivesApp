import * as React from "react";
import * as renderer from "react-test-renderer";

import { createSink } from "recompose";

import { fetchDataHandlers, shouldFetchData } from "../../components/shouldFetchData";

describe("shouldFetchData", () => {
  let props: any;

  beforeEach(() => {
    props = {
      fetchData: jest.fn(),
      fetchNextPage: jest.fn(),
      isLoading: false,
      nextPage: false,
      results: [],
      timeToLive: 0
    };
  });

  it("should fetchData from initial state", () => {
    const sink = createSink((sinkProps: any) => {
      expect(sinkProps).toMatchSnapshot();
    });

    const EnhancedSink = shouldFetchData(sink);
    renderer.create(<EnhancedSink {...props} />);
    expect(props.fetchData).toHaveBeenCalledTimes(1);
  });

  describe("fetchDataHandlers", () => {
    it("should fetchData with refresh passed in as a parameter", () => {
      const sink = createSink((sinkProps: any) => {
        sinkProps.fetchData(true);
        expect(props.fetchData).toHaveBeenCalledTimes(1);
      });

      const EnhancedSink = fetchDataHandlers(sink);
      renderer.create(<EnhancedSink {...props} />);
    });
  });
});
