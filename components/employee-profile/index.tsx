import Link from "next/link";
import * as React from "react";
import Image from "next/image";
import { useMutation, useQueryClient } from "react-query";
import { EmployeeModel } from "../../models/employee";
import { ic_arrow_back } from "react-icons-kit/md/ic_arrow_back";
import { ic_star } from "react-icons-kit/md/ic_star";
import { ic_location_on } from "react-icons-kit/md/ic_location_on";
import { birthdayCake } from "react-icons-kit/fa/birthdayCake";
import { ic_local_phone } from "react-icons-kit/md/ic_local_phone";
import Icon from "react-icons-kit";
interface IEmployeeProfileProps {
  employee: EmployeeModel;
}

const EmployeeProfile: React.FunctionComponent<IEmployeeProfileProps> = (props) => {
  const { employee } = props;

  return (
    <>
      <div className='py-3 mb-5'>
        <Link href='/' passHref>
          <a className='px-4 py-3 rounded-full border border-gray-100 bg-gray-50 text-gray-600 text-base hover:text-gray-700 hover:bg-gray-100 transition-colors'>
            <Icon icon={ic_arrow_back} className='icon mr-1' size={22} /> Geri
          </a>
        </Link>
      </div>
      <div className=''>
        <div className='flex gap-3 flex-col md:flex-row md:justify-between'>
          <div className='flex gap-3 flex-col md:flex-row'>
            <div className='w-32 h-32 md:w-12 md:h-12 rounded-lg overflow-hidden'>
              <Image alt={employee.firstName + " " + employee.lastName} width={200} height={200} src={employee.avatar + `?${employee.gender},${employee.firstName}&content_filter=high`} />
            </div>
            <div className='flex flex-col justify-center'>
              <h1 className='text-2xl leading-none text-gray-700 relative'>
                {employee.firstName} {employee.lastName}
              </h1>
              <h2 className='text-base text-gray-400'>
                {employee.jobTitle} <span className='text-gray-500'>@{employee.company.name}</span>
              </h2>
            </div>
          </div>
          <div>
            <span className='py-2 px-4 text-lg border text-indigo-500 border-indigo-700 rounded-md'>
              <Icon icon={ic_star} className='icon mr-2' size={22} />
              {employee.rate} puan
            </span>
          </div>
        </div>
        <div className='h-1 border-b my-5 border-opacity-50'></div>
        <div className='space-y-3 mt-5 text-gray-700'>
          <div>
            <Icon icon={birthdayCake} size={20} className='icon mr-3' />
            {employee.age} yaşında
          </div>
          <div>
            <Icon icon={ic_local_phone} size={20} className='icon mr-3' />
            {employee.phone}
          </div>
          <address>
            <Icon icon={ic_location_on} size={22} className='icon mr-2' />
            {employee.address}
          </address>
        </div>
      </div>
    </>
  );
};

export default EmployeeProfile;
