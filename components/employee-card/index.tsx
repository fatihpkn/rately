import { ApolloQueryResult } from "@apollo/client";
import Link from "next/link";
import React, { MouseEventHandler } from "react";
import { useMutation, useQueryClient } from "react-query";
import { EmployeeModel } from "../../models/employee";
import { EmployeesQueryModel } from "../../models/queries";
import shouldRender from "../../utils/shouldRender";

interface IEmployeeCardProps {
  employee: EmployeeModel;
}

const UserCardComp: React.FunctionComponent<IEmployeeCardProps> = (props) => {
  const { employee } = props;

  const client = useQueryClient();

  const { mutate } = useMutation(
    async (_employee) => {
      // API isteği yapılacak yer.
      // Fake API ile update yapılamadığı için her seferinde ilk değeri dönecek, çalışan bir API ile eployee.rate update işlemi yapılabilir.
    },
    {
      onMutate: (_employee: EmployeeModel) => {
        const prevEmployeesQuery = client.getQueryData<ApolloQueryResult<EmployeesQueryModel>>("employees");

        const prevEmployees = prevEmployeesQuery?.data.employees ? [...prevEmployeesQuery?.data.employees] : [];

        const _employees = prevEmployees ? [...prevEmployees] : [];

        const updatedEmployees = [..._employees.filter((e) => e.id !== _employee.id), { ..._employee }];

        const _newEmployeesData: ApolloQueryResult<EmployeesQueryModel> = {
          ...prevEmployeesQuery,
          data: {
            employees: updatedEmployees,
          },
        };

        client.setQueryData<ApolloQueryResult<EmployeesQueryModel>>("employees", _newEmployeesData);
      },
    }
  );

  const handleUpvateClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutate({ ...employee, rate: employee.rate + 1 });
  };

  return (
    <Link href={`/user/${employee.id}`} passHref>
      <a>
        <div className='employee-card'>
          <div className='employee-card-inner'>
            <div className='employee-card-image'>
              <img src={employee.avatar + `?${employee.gender},${employee.firstName}&content_filter=high`} />
            </div>
            <div className='employee-card-description'>
              <div className='employee-card-name'>
                {employee.firstName} {employee.lastName}
              </div>
              <div>
                <small className='text-gray-400 leading-tight block h-8'>{employee.jobTitle}</small>
              </div>
            </div>
            <div className='pb-2 flex flex-row justify-between items-center px-3'>
              <div>{employee.rate} puan</div>
              <div>
                <button onClick={handleUpvateClick} className='border border-green-200 px-3 rounded text-sm bg-green-50 text-green-800'>
                  Oy Ver
                </button>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

const UserCard = React.memo(UserCardComp, (prev, next) => shouldRender(prev.employee, next.employee, ["id", "firstName", "lastName", "avatar", "jobTitle", "rate"]));

export default UserCard;
