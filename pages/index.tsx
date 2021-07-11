import { ApolloQueryResult, gql } from "@apollo/client";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { QueryClient, useQuery } from "react-query";
import Client from "../apollo";
import EmployeesList from "../components/employees-list";
import MainContainer from "../components/main-container";
import { EmployeesProvider } from "../context/employees";
import { EmployeeModel } from "../models/employee";
import { EmployeesQueryModel } from "../models/queries";
import { dehydrate, DehydratedState } from "react-query/hydration";
import { GetEmployees } from "../queries/employee";

interface IHomeProps extends ApolloQueryResult<EmployeesQueryModel> {
  employees: EmployeeModel[];
  dehydratedState: DehydratedState;
}

const Home: NextPage<IHomeProps> = (props) => {
  const { employees, dehydratedState } = props;

  const { data, isError } = useQuery("employees", async () => await GetEmployees());

  const _employees = data?.data.employees;

  return (
    <div>
      <Head>
        <title>RATE`LY</title>
        <meta name='description' content='Rate' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MainContainer>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 animate-fadeIn duration-75'>{isError ? <h1>Opss.. bir hata var :(</h1> : <EmployeesList employees={_employees} />}</div>
      </MainContainer>

      <footer></footer>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("employees", async () => await GetEmployees());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
