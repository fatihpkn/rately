import { ApolloQueryResult } from "@apollo/client";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { QueryClient, useQuery } from "react-query";
import { dehydrate, DehydratedState } from "react-query/hydration";
import EmployeesList from "../components/employees-list";
import MainContainer from "../components/main-container";
import { EmployeeModel } from "../models/employee";
import { EmployeesQueryModel } from "../models/queries";
import { GetEmployees } from "../queries/employee";

interface IHomeProps extends ApolloQueryResult<EmployeesQueryModel> {
  employees: EmployeeModel[];
  dehydratedState: DehydratedState;
}

const Home: NextPage<IHomeProps> = (props) => {
  const { data, isError, isFetchedAfterMount } = useQuery("employees", async () => await GetEmployees(), { keepPreviousData: true });

  const _employees = data?.data.employees;

  return (
    <div>
      <Head>
        <title>RATE`LY</title>
        <meta name='description' content='Rate' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MainContainer>{isError ? <h1>Opss.. bir hata var :(</h1> : !isFetchedAfterMount ? <div /> : <EmployeesList employees={_employees} />}</MainContainer>

      <footer></footer>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("employees", async () => await GetEmployees());

  return {
    revalidate: 1,
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
