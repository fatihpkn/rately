import * as React from "react";
import { useEmloyees } from "../../context/employees";
import { EmployeeModel } from "../../models/employee";
import UserCard from "../employee-card";

interface IEmployeesListProps {
  employees?: EmployeeModel[];
}

const EmployeesList: React.FunctionComponent<IEmployeesListProps> = (props) => {
  const { employees } = props;

  const sortedData = employees ? employees.slice().sort((a, b) => b.rate - a.rate) : [];

  return <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 animate-fadeIn duration-75'>{sortedData ? sortedData.map((d, i) => <UserCard key={d.id} employee={d} />) : <div />}</div>;
};

export default EmployeesList;
