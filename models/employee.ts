import { CompanyModel } from "./company";

export enum Gender {
  Male = "male",
  Female = "female",
}

export interface EmployeeModel {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  age: number;
  phone: string;
  jobTitle: string;
  address: string;
  subordinates: string;
  company: CompanyModel;
  rate: number;
}
