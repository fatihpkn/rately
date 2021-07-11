import { ApolloProvider } from "@apollo/client";
import { GetStaticProps } from "next";
import App from "next/app";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { dehydrate, Hydrate } from "react-query/hydration";
import Client from "../apollo";
import Header from "../components/header";
import { GetEmployees } from "../queries/employee";
import "../styles/globals.sass";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";

const $queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 100000000, // 24 hours
    },
  },
});

const RatelyApp = (props) => {
  const [queryClient] = React.useState(() => $queryClient);

  const { Component, pageProps } = props;

  return (
    <ApolloProvider client={Client}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Header />
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </ApolloProvider>
  );
};

RatelyApp.getInitialProps = async (context) => {
  const appProps = await App.getInitialProps(context);
  return { ...appProps };
};

export default RatelyApp;
