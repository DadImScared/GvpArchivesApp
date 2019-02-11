import * as React from "react";

import { compose, hoistStatics, lifecycle, withHandlers } from "recompose";
import { Omit } from "utility-types";

interface IProps {
  fetchData: () => void;
  fetchNextPage: () => void;
  isLoading: boolean;
  timeToLive: number;
  nextPage: boolean | string;
  results: any[];
}

interface INextPageHandlerProps extends Omit<IProps, "fetchData"> {
  fetchData: (refresh: boolean) => void;
}

const isValidValidTimeToLive = (time: number) => time ? time >= +new Date() : false;

export const fetchDataHandlers = withHandlers<IProps, { fetchData: () => void }>(() => ({
  fetchData: ({ fetchData, results, isLoading, timeToLive }) => (refresh = false) => {
    if (refresh && !isLoading) {
      fetchData();
    }
    else if (!isLoading && !results.length && !isValidValidTimeToLive(timeToLive)) {
      fetchData();
    }
  }
}));

export const fetchNextPageHandlers = withHandlers<INextPageHandlerProps, { fetchNextPage: () => void }>({
  fetchNextPage: ({ fetchData, fetchNextPage, nextPage, timeToLive, isLoading }) => () => {
    if (isLoading) return;
    if (isValidValidTimeToLive(timeToLive) && typeof nextPage === "string") {
      fetchNextPage();
    }
    else if (!isValidValidTimeToLive(timeToLive)) {
      fetchData(true);
    }
  }
});

const fetchDataLifecycle = lifecycle<IProps, any>({
  componentDidMount() {
    this.props.fetchData();
  }
});

export const shouldFetchData = hoistStatics<IProps>(
  compose(
    fetchDataHandlers,
    fetchNextPageHandlers,
    fetchDataLifecycle
  )
);
