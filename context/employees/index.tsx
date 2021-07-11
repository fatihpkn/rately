import React, { createContext, ReactNode, useContext, useState } from "react";
import { EmployeeModel } from "../../models/employee";
import { RatelyCotnext } from "../models";

interface IEmployeeContextModel {
  data?: EmployeeModel[];
  loading?: boolean;
  upVoteEmployee?: (employee: EmployeeModel) => void;
}

export const EmployeesContext = createContext<IEmployeeContextModel>({});

export function useEmloyees() {
  return useContext(EmployeesContext);
}

type Props = {
  children: ReactNode;
  employees: EmployeeModel[];
};

export function EmployeesProvider({ children, employees }: Props) {
  const [state, setState] = React.useState({
    data: employees,
    loading: false,
  });

  const upVote = (employee: EmployeeModel) => {
    const $data = [...state.data];

    let _index = $data.findIndex((e) => e.id === employee.id);

    $data[_index] = {
      ...$data[_index],
      rate: $data[_index].rate + 1,
    };

    setState({
      data: $data,
      loading: false,
    });
  };

  const _state: IEmployeeContextModel = React.useMemo(() => ({ ...state, upVoteEmployee: upVote }), [state]);

  return <EmployeesContext.Provider value={_state}>{children}</EmployeesContext.Provider>;
}
