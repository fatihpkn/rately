import { createStore, Store } from "easy-peasy";
import { useMemo } from "react";
import { RatelyStore, StoreModel } from "./model";

let store: Store<StoreModel>;

const initialState = {};

export function initStore(preloadedState = initialState) {
  console.log("store", store);
  return createStore(RatelyStore, { initialState: preloadedState, name: "rately-store", version: 3 });
}

export const initializeStore = (preloadedState: StoreModel) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
