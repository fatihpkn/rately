import { action, Action, persist, State } from "easy-peasy";

export interface AppStoreModel<K> {
  variables: K;
  notifications: State<object[]>;
  appVariableSet: Action<AppStoreModel<K>, { key: keyof K; value: any }>;
}

const AppStore: AppStoreModel<{ loading?: boolean | string }> = persist(
  {
    variables: {},

    appVariableSet: action((state, payload) => {
      state.variables[payload.key] = payload.value;
    }),
    notifications: [],
  },
  { deny: [] }
);

export default AppStore;
