import axios from "axios";
jest.mock("axios");

import { getSearchResults, normalizeSearchResults } from "../../actions/searchResults";
import { SEARCH_RESULTS } from "../../loadingPrefix";
import { getInitialReducerState } from "../../reducers";
import { getQueryId } from "../../reducers/search";
import { makeQueryString } from "../../utils/queryString";

describe("searchResults", () => {
  describe("normalizeSearchResults", () => {
    it("should normalize results", () => {
      const items = [
        {
          category: "harikatha",
          highlightedBody: "[In 2007, in honor of Sri <em>Radhastami</em>, Srila Bhaktivedanta Narayana Gosvami Maharaja gave two discourses on the glories of Srimati Radhika; one on the eve of <em>Radhastami</em> and one on the following morning.",
          item_id: "78d1a9dc-3785-46f1-a6db-407e1fb40c2d",
          link: "http://www.purebhakti.com/teachers/bhakti-discourses-mainmenu-61/52-discourses-2009/1086-the-glory-of-sri-radha.html",
          title: "The Glory of Sri Radha",
        },
        {
          category: "harikatha",
          highlightedTitle: "Here is  a commentary, given on Sri <em>Radhastami</em> Day, two weeks later.  Here again, by the manifestation of the mercy of Srimati Radhika in the heart of Srila Maharaja, ever-new meanings are revealed.]",
          item_id: "ae955019-8cb3-4f4d-a578-48d9c065847d",
          link: "http://www.purebhakti.com/teachers/bhakti-discourses-mainmenu-61/22-discourses-2003/367-sri-radhastami-day.html",
          title: "Sri Radhastami Day"
        }
      ];
      expect(normalizeSearchResults(items)).toMatchSnapshot();
    });
  });
  describe("getSearchResults", () => {

    beforeEach(() => {
      jest.resetAllMocks();
    });

    const successResponse = {
      data: {
        nextPage: false,
        results: [{ item_id: "item1", category: "book", title: "item-1", link: "item-1-link" }],
        suggestions: []
      }
    };
    const query = "query";
    const categories = ["book", "movie"];

    it("should have a loading ID", () => {
      const results = getSearchResults(query, categories);
      expect(results.loadingId).toEqual(`${SEARCH_RESULTS}${getQueryId(query, categories)}`);
    });

    it("should not fetch data if loading", () => {
      const results = getSearchResults(query, categories);
      (axios.get as any).mockImplementationOnce(() => Promise.resolve(successResponse));
      const loading = {
        [`${SEARCH_RESULTS}${getQueryId(query, categories)}`]: true
      };
      expect(
        results.shouldCallApi && results.shouldCallApi(getInitialReducerState({
          loading: {
            ...loading
          }
        }), jest.fn())
      ).toEqual(false);
    });

    it("should have correct first page url and add search", async () => {
      (axios.get as any).mockImplementationOnce((url: string) => {
        expect(url.split(".com")[1]).toEqual(
          `/api/v1/search/query/?${makeQueryString({ categories })}`
        );
        return Promise.resolve(successResponse);
      });
      const results = getSearchResults(query, categories);
      expect(
        results.afterApiCall && results.afterApiCall(
          await results.apiCall(getInitialReducerState(), jest.fn()),
          getInitialReducerState(),
          jest.fn()
        )
      ).toMatchSnapshot();
    });

    it("should have correct next page url and update search", async () => {
      (axios.get as any).mockImplementationOnce((url: string) => {
        expect(url.split(".com")[1]).toEqual(
          `/api/v1/search/query/?${makeQueryString({ categories, page: 2 })}`
        );
        return Promise.resolve(successResponse);
      });
      const state = getInitialReducerState(
        {
          searchResults: {
            [getQueryId(query, categories)]: {
              nextPage: `/api/v1/search/query/?${makeQueryString({ categories, page: 2 })}`,
              results: [],
              suggestions: [],
              timeToLive: (+new Date()) + 2000
            }
          }
        }
      );
      const dispatch = jest.fn();
      const results = getSearchResults(query, categories);
      const apiResults: any = await (results.shouldCallApi && results.shouldCallApi(state, dispatch));
      const afterApiCall = results.afterApiCall && results.afterApiCall(apiResults, state, dispatch);
      expect(afterApiCall).toMatchSnapshot();
    });
  });
});
