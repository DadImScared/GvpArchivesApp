import { getNavigationParams } from "../../utils/navigation";

describe("navigation", () => {
  describe("getNavigationParams", () => {
    it("should get navigation params", () => {
      const params: { [key: string]: any } = {
        categories: ["movie", "book"]
      };
      const navigation: any = {
        getParam: <T>(param: string, fallback: T): T => {
          return params[param] || fallback;
        }
      };
      const [categories] = getNavigationParams({ categories: [] }, navigation);
      expect(categories).toEqual(params.categories);
    });
  });
});
