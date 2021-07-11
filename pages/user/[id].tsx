import { ApolloQueryResult } from "@apollo/client";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import Client from "../../apollo";
import EmployeeProfile from "../../components/employee-profile";
import MainContainer from "../../components/main-container";
import { EmployeeModel } from "../../models/employee";
import { EmployeeQueryModel, EmployeesQueryModel } from "../../models/queries";
import { GetEmployeeByID, GetEmployees } from "../../queries/employee";

interface IUserProfilePageProps {
  params: any;
  employee: EmployeeModel;
}

const UserProfile: NextPage<IUserProfilePageProps> = (props) => {
  const { params } = props;

  const client = useQueryClient();

  const _allEmployees = client.getQueryData<ApolloQueryResult<EmployeesQueryModel>>("employees");
  const _employee = client.getQueryData<ApolloQueryResult<EmployeeQueryModel>>(["employee", params.id]);

  const employee = _allEmployees?.data.employees.find((em) => em.id === params.id) || _employee?.data.employee;

  return (
    <div>
      <Head>
        <title>
          RATE`LY | {employee?.firstName} {employee?.lastName}
        </title>
        <meta name='description' content={employee ? employee.firstName + " " + employee.lastName : "Kullanıcı bulunamadı"} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MainContainer>
        {employee ? (
          <div className='animate-fadeIn duration-75'>
            <EmployeeProfile employee={employee} />
          </div>
        ) : (
          <div>Not found</div>
        )}
      </MainContainer>

      <footer></footer>
    </div>
  );
};

export default UserProfile;

export const getServerSideProps: GetServerSideProps<IUserProfilePageProps> = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["employee", context?.params?.id], async () => await GetEmployeeByID(context?.params?.id));

  return {
    props: {
      params: context?.params,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
