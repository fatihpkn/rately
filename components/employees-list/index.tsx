import * as React from "react";
import { useEmloyees } from "../../context/employees";
import { EmployeeModel } from "../../models/employee";
import UserCard from "../employee-card";

export interface IEmployeesListProps {
  employees: EmployeeModel[];
}

export default function EmployeesList(props: IEmployeesListProps) {
  const { employees } = props;

  const sortedData = employees ? employees.slice().sort((a, b) => b.rate - a.rate) : [];

  return sortedData && sortedData.map((d, i) => <UserCard key={d.id} employee={d} />);
}
