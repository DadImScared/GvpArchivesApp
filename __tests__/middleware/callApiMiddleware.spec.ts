import { callApiMiddleware } from "../../callApiMiddleware";
import { getInitialReducerState, IReducerState } from "../../reducers";

const create = (middleWare = callApiMiddleware) => {
  const store = {
    dispatch: jest.fn(),
    getState: jest.fn((): IReducerState => getInitialReducerState({
      search: { query: "query" }
    }))
  };
  const next = jest.fn();

  const invoke = (action: any) => middleWare(store)(next)(action);

  return { store, next, invoke };
};

describe("callApiMiddleware", () => {
  let baseAction: any;
  let invoke: any;
  let next: any;
  let store: any;
  beforeEach(() => {
    baseAction = {
      afterApiCall: jest.fn(() => []),
      apiCall: jest.fn(() => Promise.resolve({ data: {} })),
      beforeApiCall: jest.fn(() => []),
      loadingId: "LOADING_ID_HERE"
    };
    const createMiddleware = create();
    invoke = createMiddleware.invoke;
    next = createMiddleware.next;
    store = createMiddleware.store;
  });

  it("should pass through not matching action", () => {
    const action = { type: "TEST" };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it("should respond to api call", async () => {
    await invoke(baseAction);
    expect(baseAction.apiCall).toHaveBeenCalledWith(store.getState(), store.dispatch);
    expect(baseAction.afterApiCall).toHaveBeenCalledWith({ data: {} }, store.getState(), store.dispatch);
    expect(store.dispatch.mock.calls).toMatchSnapshot("loading actions");
  });

  it("should call shouldCallApi function", async () => {
    const action = {
      ...baseAction,
      shouldCallApi: jest.fn(() => false)
    };
    await invoke(action);
    expect(action.shouldCallApi).toHaveBeenCalledWith(store.getState(), store.dispatch);
    expect(store.dispatch).toHaveBeenCalledTimes(0);
    expect(action.apiCall).toHaveBeenCalledTimes(0);
  });
});
