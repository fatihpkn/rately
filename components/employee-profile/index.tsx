import Link from "next/link";
import * as React from "react";
import { EmployeeModel } from "../../models/employee";

interface IEmployeeProfileProps {
  employee: EmployeeModel;
}

const EmployeeProfile: React.FunctionComponent<IEmployeeProfileProps> = (props) => {
  const { employee } = props;

  return (
    <>
      <div className='py-3 mb-5'>
        <Link href='/' passHref>
          <a className='px-4 py-1 rounded-full border border-gray-100 bg-gray-50'> {`<`} Geri</a>
        </Link>
      </div>
      <div className=''>
        <div className='flex gap-3'>
          <div className='w-14 h-14 rounded-lg overflow-hidden'>
            <img src={employee.avatar + `?${employee.gender},${employee.firstName}&content_filter=high`} />
          </div>
          <div className='flex flex-col justify-center'>
            <h1 className='text-2xl leading-none text-gray-700'>
              {employee.firstName} {employee.lastName}
            </h1>
            <h2 className='text-base text-gray-400'>
              {employee.jobTitle} at {employee.company.name}
            </h2>
          </div>
        </div>
        <div className='h-1 border-b my-3 border-opacity-50'></div>
        <div className='space-y-2'>
          <div className='uppercase'>
            {employee.gender} <small>({employee.age} years old)</small>
          </div>
          <div>{employee.address}</div>
        </div>
      </div>
    </>
  );
};

export default EmployeeProfile;
