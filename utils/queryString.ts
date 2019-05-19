export const makeQueryString = (queryObj: { [key: string]: any }) => {
  return Object.entries(queryObj).reduce((queryStrings: string[], [queryKey, queryValue]) => {
    if (Array.isArray(queryValue)) {
      const multiValueQueryString = queryValue.map((value: any) => `${queryKey}=${encodeURIComponent(value)}`);
      queryStrings.push(multiValueQueryString.join("&"));
    } else {
      queryStrings.push(`${queryKey}=${encodeURIComponent(queryValue)}`);
    }
    return queryStrings;
  }, []).join("&");
};
