import Link from "next/link";
import { EmployeeModel } from "../../models/employee";
import { useStoreActions, useStoreState } from "../../store/model";

interface IEmployeeCardProps {
  employee: EmployeeModel;
}

const UserCard: React.FunctionComponent<IEmployeeCardProps> = (props) => {
  const { upVoteEmployee } = useStoreActions((store) => store.Employees);

  const { employee } = props;

  const handleUpvateClick = (e: MouseEvent) => {
    e.preventDefault();

    upVoteEmployee(employee);
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

export default UserCard;
