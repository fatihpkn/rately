import { EmployeeModel } from "./employee";

export interface EmployeesQueryModel {
  employees: EmployeeModel[];
}

export interface EmployeeQueryModel {
  employee: EmployeeModel;
}
