import { EmployeeModel } from "./employee";

export interface CompanyModel {
  id: string;
  name: string;
  industry: string;
  employees: EmployeeModel[];
}
