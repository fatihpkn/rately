import { action, Action, computed, Computed, persist, State, thunk, Thunk } from "easy-peasy";
import { EmployeeModel } from "../../models/employee";

export interface EmployeesStoreModel {
  data?: State<EmployeeModel[]>;
  setData: Action<EmployeesStoreModel, EmployeeModel[]>;
  upVoteEmployee: Action<EmployeesStoreModel, EmployeeModel>;
}

const EmployeesStore: EmployeesStoreModel = {
  data: [],
  setData: action((state, payload) => {
    state.data = payload;
  }),
  upVoteEmployee: action((state, payload) => {
    const employee = state.data?.find((e) => e.id === payload.id);
    employee.rate = employee.rate + 1;
  }),
};

export default EmployeesStore;
