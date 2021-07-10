import { createTypedHooks } from "easy-peasy";
import AppStore, { AppStoreModel } from "./app";
import EmployeesStore, { EmployeesStoreModel } from "./employees";

export interface StoreModel {
  App: AppStoreModel<{ loading?: boolean | string }>;
  Employees: EmployeesStoreModel;
}

const { useStoreActions, useStoreState, useStoreDispatch, useStore } = createTypedHooks<StoreModel>();

export { useStoreActions, useStoreState, useStoreDispatch, useStore };

export const RatelyStore: StoreModel = {
  App: AppStore,
  Employees: EmployeesStore,
};
