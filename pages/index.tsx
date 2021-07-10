import { ApolloQueryResult, gql } from "@apollo/client";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Client from "../apollo";
import UserCard from "../components/employee-card";
import MainContainer from "../components/main-container";
import { EmployeeModel } from "../models/employee";
import { EmployeesQueryModel } from "../models/queries";
import { initializeStore } from "../store";

interface IHomeProps extends ApolloQueryResult<EmployeesQueryModel> {
  employees: EmployeeModel[];
}

const Home: NextPage<IHomeProps> = (props) => {
  const { employees } = props;

  return (
    <div>
      <Head>
        <title>RATE`LY</title>
        <meta name='description' content='Rate' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MainContainer>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 animate-fadeIn duration-75'>
          {employees &&
            employees.map((d, i) => (
              <UserCard key={d.id} employee={d}>
                {d.firstName} {d.lastName}
                <button className='border bg-blue-400 text-white'>Upvote</button>
              </UserCard>
            ))}
        </div>
      </MainContainer>

      <footer></footer>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const result = await Client.query<EmployeesQueryModel>({
    query: gql`
      {
        employees {
          id
          avatar
          firstName
          lastName
          jobTitle
          gender
          age
          address
          rate
          company {
            name
          }
        }
      }
    `,
  });

  const sortedEmployees = result?.data?.employees.length ? result?.data?.employees.slice().sort((a, b) => b.rate - a.rate) : [];

  const store = initializeStore({ Employees: { data: sortedEmployees } });

  store.getActions().Employees.setData(sortedEmployees);

  const employees = store.getState().Employees.data;

  return {
    props: {
      employees: employees,
      ssrStoreState: store.getState(),
    }, // will be passed to the page component as props
  };
};
