import rootReducer from "./reducers";
import { render } from "@testing-library/react";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

/**
 * Create a testing store with imported reducers, middleware, and initial state.
 * globals: rootReducer, middlewares
 * @function storeFactory
 * @param {object} initialState Initial state for store
 * @returns {Store} redux store
 */

const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore);

export const storeFactory = initialState => {
  return createStoreWithMiddleWare(rootReducer, initialState);
};

export function renderWithRedux(
  ui,
  {
    initialState,
    store = createStoreWithMiddleWare(rootReducer, initialState),
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>{ui}</Router>
      </Provider>
    ),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store
  };
}
